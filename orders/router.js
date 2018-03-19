const isValidOrder = require('./validator/isValidOrder')
const isValidId = require('../server/validator/isValidId')
const format = require('./domain/format')
const updateTotalsList = require('./domain/updateTotalsList')
const fileHandler = require('../server/tools/fileHandler')
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
const getProductById = require('../products/usecase/getById')(fileHandlers.products)
const {deleteOrder} = require('./usecase/deleteOrder')(fileHandlers.orders)

function router (req, res, route, id) {
  if (req.method === 'PUT') {
    if (isValidId(id)) {
      getData(req, (errGetData, requestData) => {
        if (errGetData) {
          res.writeHead(400)
          res.end()
        }
        try {
          const updatedOrders = updateOrCreate(id, requestData, isValidOrder, alreadyExist,
            update, add, format, updateTotalsList, getProductById)
          res.statusCode = 200
          res.end(JSON.stringify(updatedOrders))
        } catch (errUpdate) {
          console.log(errUpdate)
          if (errUpdate instanceof InvalidOrderFormatError) {
            res.statusCode = 400
            res.end('Invalid format Error: id and products must be defined and status can only ' +
              'be pending, paid or cancel')
          }
        }
      })
    } else {
      res.statusCode = 400
      res.end('ID undefined can not PUT data')
    }
  }
  if (req.method === 'POST') {
    getData(req, (errGetData, requestData) => {
      if (errGetData) {
        res.writeHead(500)
        res.end()
      }
      let id = 1
      while (alreadyExist(id)) { id += 1 }
      try {
        const updatedOrders = updateOrCreate(id, JSON.parse(requestData), isValidOrder, alreadyExist,
          update, add, format, updateTotalsList, getProductById.getById)
        res.statusCode = 200
        res.end(JSON.stringify(updatedOrders))
      } catch (errUpdate) {
        console.log(errUpdate)
        if (errUpdate instanceof InvalidOrderFormatError) {
          res.statusCode = 400
          res.end('Invalid format Error: id and products must be defined and status can only ' +
            'be pending, paid or cancel')
        }
      }
    })
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
      deleteOrder(id)
      res.statusCode = 200
      res.end()
    }
  }
}

module.exports = router

function getData (req, callback) {
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
