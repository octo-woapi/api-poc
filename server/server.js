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
  const ressource = route[0]
  const id = parseInt(route[1])
  switch (ressource) {
    case 'products':
      products(req, res, route, params)
      break
    case 'orders':
      orders(req, res, route, id)
      break
    default:
      res.write('Hello world')
      res.end()
  }
})

module.exports = server
