const http = require('http')
const fs = require('fs')

const productsJSON = JSON.parse(fs.readFileSync('products.json'))
const products = productsJSON.products

const server = http.createServer((req, res) => {
  res.writeHead(200)

  if (req.url === '/products' && req.method === 'GET') {
    console.log(products)
  } else if (req.url === '/products' && req.method === 'POST') {
    req.on('data', (chunk) => {
      const json = JSON.parse(chunk.toString('utf8')) // Need to check JSON format
      // add the product to the JSON
      let id = products.length + 1
      let newproduct = { // conditions
        'id': id,
        'name': json.name,
        'price': json.price,
        'weight': json.weight
      }
      products[id - 1] = newproduct
      console.log(products)
      fs.writeFile('products.JSON', "{'products': " + products + '}', (err) => {
        if (err) throw err
        console.log('Product has been added')
      })
    })
  } else {
    res.write('Hello world')
  }
  res.end()
})

module.exports = server
