const http = require('http')
const tools = require('./tools')

const server = http.createServer((req, res) => {
  res.writeHead(200)

  if (req.url === '/products' && req.method === 'GET') {
    console.log(tools.getProducts())
  } else if (req.url === '/products' && req.method === 'POST') {
    req.on('data', (chunk) => {
      const json = tools.getPostValues(chunk.toString('utf8'))
      console.log(json.name + ' ' + json.price + ' ' + json.weight)
      if (typeof json.name === 'undefined' || !json.name) {
        throw new Error('Name of the product is undefined')
      } else {
        if (typeof json.price === 'undefined' || !json.price) { json.price = 0 }
        if (typeof json.weight === 'undefined' || !json.weight) { json.weight = 0 }
        tools.addProduct(json.name, parseFloat(json.price), parseFloat(json.weight))
      }
    })
  } else {
    res.write('Hello world')
  }
  res.end()
})

module.exports = server
