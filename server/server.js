const http = require('http')
const products = require('../products/router.js')
const tools = require('./tools.js')
const orders = require('../orders/router')

const server = http.createServer((req, res) => {
  let url = req.url; let params; let route = []
  if (url.indexOf('?') > 0) {
    params = tools.getParams(url)
  }
  route = tools.getRoute(url)
  switch (route[0]) {
    case 'products':
      products.main(req, res, route, params)
      break
    case 'orders':
      orders.main(req, res, route, params)
      break
    default:
      res.write('Hello world')
  }
  res.end()
})

module.exports = server
