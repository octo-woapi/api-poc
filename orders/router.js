const validator = require('./validator/alreadyExist')
const add = require('./usecase/add')
const update = require('./usecase/update')
const fileHandler = require('../server/fileHandler')
const get = require('./usecase/getList')
const updateOrCreate = require('./usecase/updateAndCreate')

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
