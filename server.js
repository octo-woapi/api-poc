const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  res.writeHead(200)

  if (req.url === '/products' && req.method === 'GET') {
    const products = JSON.parse(fs.readFileSync('products.json'))
    for (let i in products) {
      res.write(products[i].name + ' ' + products[i].price + ' ' + products[i].price)
    }
  } else {
    res.write('Hello world')
  }
  res.end()
})

module.exports = server
