const http = require('http')
const products = require('../products/router.js')
const tools = require('./tools/url.js')
const orders = require('../orders/router')
const bills = require('../bills/router')

const server = http.createServer((req, res) => {
  let url = req.url; let params
  if (url.indexOf('?') !== -1) {
    params = tools.getParams(url)
  }
  const route = tools.getRoute(url)
  const resource = route[0]
  const id = parseInt(route[1])
  switch (resource) {
    case 'products':
      products(req, res, route, params)
      break
    case 'orders':
      orders(req, res, route, id)
      break
    case 'bills':
      bills(req, res, id)
      break
    default:
      res.write('Hello world')
      res.end()
  }
})

module.exports = server
