const isValidOrder = require('./validator/isValidOrder')
const isValidId = require('../server/validator/isValidId')
const format = require('./domain/format')
const updatePriceList = require('./domain/updatePriceList')
const fileHandler = require('../server/fileHandler')
const {updateOrCreate, InvalidOrderFormatError} = require('./usecase/updateAndCreate')

const env = process.env.NODE_ENV || 'development'
const conf = require('../server/conf')[env]

const fileHandlers = {
  orders: fileHandler(conf.data.orders),
  products: fileHandler(conf.data.products)
}

const {add} = require('./usecase/add')(fileHandlers.orders)
const {update} = require('./usecase/update')(fileHandlers.orders)
const {alreadyExist} = require('./validator/alreadyExist')(fileHandlers.orders)
const getList = require('./usecase/getList')(fileHandlers.orders)
const {getById} = require('./usecase/getById')(fileHandlers.orders)
const {deleteOrder} = require('./usecase/deleteOrder')(fileHandlers.orders)
const getProductById = require('../products/get')(fileHandlers.products).getById

function router(req, res, route, id) {
  if (req.method === 'PUT') {
    if (isValidId(id)) {
      try {
        getData(req, (errGetData, requestData) => {
          if (errGetData) {
            res.writeHead(500)
            res.end()
          }
          const updatedOrders = updateOrCreate(id, requestData, isValidOrder, alreadyExist,
            update, add, format, updatePriceList, getProductById)
          res.statusCode = 200
          res.end(JSON.stringify(updatedOrders))
        })
      } catch (errUpdate) {
        console.log(errUpdate)
        if (errUpdate instanceof InvalidOrderFormatError) {
          res.statusCode = 500
          res.end('Invalid format Error: id and products must be defined and status can only ' +
            'be pending, paid or cancel')
        }
      }
    } else {
      res.statusCode = 500
      res.end('ID undefined can not PUT data')
    }
  }
  if (req.method === 'POST') {
    try {
      getData(req, (errGetData, requestData) => {
        if (errGetData) {
          res.writeHead(500)
          res.end()
        }
        const updatedOrders = updateOrCreate(null, requestData, isValidOrder, alreadyExist,
          update, add, format, updatePriceList, getProductById)
        res.statusCode = 200
        res.end(JSON.stringify(updatedOrders))
      })
    } catch (errUpdate) {
      console.log(errUpdate)
      if (errUpdate instanceof InvalidOrderFormatError) {
        res.statusCode = 500
        res.end('Invalid format Error: id and products must be defined and status can only ' +
          'be pending, paid or cancel')
      }
    }
  }
  if (req.method === 'GET') {
    if (isValidId(id)) {
      if (alreadyExist(id)) {
        res.statusCode = 200
        res.end(JSON.stringify(getById(id)))
      } else {
        res.statusCode = 403
        res.end('Forbidden')
      }
    }
    res.statusCode = 200
    res.end(JSON.stringify(getList))
  }
  if (req.method === 'DELETE') {
    if (isValidId(id)) {
      res.statusCode = 200
      res.end()
    }
  }
}

module.exports = router

function getData(req, callback) {
  let data = ''
  req.on('error', (err) => {
    callback(err)
  })
  req.on('data', (chunk) => {
    data += chunk
  })
  req.on('end', () => {
    callback(null, data)
  })
}
