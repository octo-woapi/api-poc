const validator = require('./validator.js')
const getData = require('./get.js')
const addData = require('./addData.js')
const sort = require('./sort.js')
const fileHandler = require('../server/fileHandler')

const env = process.env.NODE_ENV || 'development'
const conf = require('../server/conf')[env]

const fileHandlers = {
  products: fileHandler(conf.data.products)
}

function router (req, res, route, params) {
  if (req.method === 'GET') {
    const MORE_PARAMS = 1
    if (route.length <= MORE_PARAMS) {
      res.writeHead(200)
      return res.end(JSON.stringify(getData.getList(fileHandlers)))
    }
    let id = parseInt(route[MORE_PARAMS])
    if (validator.isValidId(id)) {
      let product = getData.getById(id, fileHandlers)
      res.writeHead(200)
      return res.end(JSON.stringify(product))
    }
    if (validator.isQueryParams(params)) {
      return res.end(sort.sort(params))
    } else {
      console.log('test')
    }
  }
  if (req.method === 'POST') {
    addData.addData(req, (err) => {
      if (err) {
        res.writeHead(400)
        return res.end()
      } else {
        res.writeHead(200)
        return res.end('Product well added')
      }
    })
  }
  if (req.method === 'PUT') {

  }
}

module.exports = {
  router
}
