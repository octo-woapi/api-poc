const fileHandler = require('../server/tools/fileHandler')
const isValidId = require('../server/validator/isValidId')

const env = process.env.NODE_ENV || 'development'
const conf = require('../server/conf')[env]

const fileHandlers = {
  bills: fileHandler(conf.data.bills)
}

const {getById, BillNotFoundError} = require('./usecase/getById')(fileHandlers.bills)
const getList = require('./usecase/getList')(fileHandlers.bills)

function router (req, res, id) {
  if (req.method === 'GET') {
    if (isValidId(id)) {
      try {
        res.statusCode = 200
        res.end(JSON.stringify(getById(id)))
      } catch (err) {
        if (err instanceof BillNotFoundError) {
          res.statusCode = 403
          res.end('Forbidden')
        }
      }
    }
    res.statusCode = 200
    res.end(JSON.stringify(getList))
  }
}

module.exports = router
