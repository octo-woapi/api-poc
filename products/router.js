const validator = require('./validator.js')
const getData = require('./getData.js')
const addData = require('./addData.js')
const sort = require('./sort.js')

function main (req, res, route, params) {
  if (req.method === 'GET') {
    if (route.length <= 1) {
      res.writeHead(200)
      return res.end(JSON.stringify(getData.getProducts()))
    }
    let id = parseInt(route[1])
    if (validator.isValidId(id)) {
      let product = getData.getProduct(id)
      res.writeHead(200)
      return res.end(JSON.stringify(product))
    }
    if (validator.isQueryParams(params)) {
      sort(params)
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
  main: main
}
