const isValidOrder = require('./validator/isValidOrder')
const isValidId = require('../server/validator/isValidId')
const format = require('./domain/format')
const updateTotalsList = require('./domain/updateTotalsList')
const fileHandler = require('../server/tools/fileHandler')
const getData = require('../server/tools/getRequestData')

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

const {updateOrCreate, InvalidOrderFormatError} = require('./usecase/updateAndCreate')(isValidOrder,
  alreadyExist, update, add, format, updateTotalsList, getProductById)

async function router (req, res, route, id) {
  if (req.method === 'PUT' || req.method === 'POST') {
    let data
    try {
      data = await getData(req)
    } catch (err) {
      res.writeHead(400)
      res.end(err)
    }

    if (req.method === 'PUT') {
      if (!isValidId(id)) {
        res.statusCode = 400
        res.end('ID undefined can not PUT data')
      }
    }
    if (req.method === 'POST') {
      id = 1
      while (alreadyExist(id)) {
        id++
      }
    }

    try {
      const updatedOrders = updateOrCreate(id, data, isValidOrder, alreadyExist,
        update, add, format, updateTotalsList, getProductById)
      res.statusCode = 200
      res.end(JSON.stringify(updatedOrders))
    } catch (errUpdate) {
      if (errUpdate instanceof InvalidOrderFormatError) {
        res.statusCode = 400
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
      deleteOrder(id)
      res.statusCode = 204
      res.end()
    }
  }
}

module.exports = router
