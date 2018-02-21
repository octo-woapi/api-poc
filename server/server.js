const http = require('http')
const products = require('../products/router.js')
const tools = require('./tools.js')

const server = http.createServer((req, res) => {
  const route = req.url.slice(req.url.indexOf('/') + 1).split('/') //créer function testable
  let last = route.slice(-1)[0]
  let params = null
  if (last.indexOf('?') >= 0) {
    params = tools.getParams(last)
    console.log(params)
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
