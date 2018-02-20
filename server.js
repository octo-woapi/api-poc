const http = require('http')
const products = require('./routes/products')
const tools = require('./tools')

const server = http.createServer((req, res) => {
  res.writeHead(200)
  const route = req.url.slice(req.url.indexOf('/') + 1).split('/')
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
