const http = require('http')
const products = require('../products/router.js')
const tools = require('./tools.js')

const server = http.createServer((req, res) => {
  let route = tools.getRoute(req.url)
  let last = route.slice(-1)[0]
  let params = null
  if (last.indexOf('?') >= 0) {
    params = tools.getParams(last)
  }
  switch (route[0]) {
    case 'products':
      products.main(req, res, route, params)
      break
    default:
      res.write('Hello world')
  }
  res.end()
})

module.exports = server
