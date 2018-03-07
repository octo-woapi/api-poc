const validator = require('./alreadyExist')
const add = require('./add')
const update = require('./update')
const fileHandler = require('../server/fileHandler')
const get = require('./get')
const updateOrCreate = require('./updateAndCreate')

const env = process.env.NODE_ENV || 'development'
const conf = require('../server/conf')[env]

const fileHandlers = {
  orders: fileHandler(conf.data.orders),
  products: fileHandler(conf.data.products)
}

function router (req, res) {
  if (req.method === 'PUT') {
    return updateOrCreate(req.body.id, req.body.value, validator.alreadyExist,
      update, add, fileHandlers)
    //res.end
  }
  if (req.method === 'GET') {
    return get.getList(fileHandlers)
    return get.getById(req.body.id, fileHandlers)
    //res.end
  }
}

module.exports = router
