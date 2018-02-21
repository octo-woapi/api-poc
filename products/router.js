const fs = require('fs')
const tools = require('../server/tools.js')
const productPrinter = require('./printer.js')
const validator = require('./validator.js')
const sort = require('./sort.js')

const productsJSON = JSON.parse(fs.readFileSync('./products/data.json', 'utf8'))
const products = productsJSON.products
let productsLength = products.length

function main (req, res, route, params) {
  console.log('test0')
  if (req.method === 'GET') {
    if (route.length > 1) {
      let id = parseInt(route[1])
      console.log(validator.isValidId(id))
      if (validator.isValidId(id)) {
        let product = productPrinter.getProduct(id)
        res.end(JSON.stringify(product))
      } else if (validator.isQueryParams(params)) {
        sort(params)
      } else {
        console.log('test')
      }
    } else {
      console.log(productPrinter.getProducts())
    }
  } else if (req.method === 'POST') {
    console.log('test1')
    getData(req, (err, data) => {
      console.log('test2')
      if (err) throw err
      let json = tools.getParams(data.toString('utf8'))
      validator.validateInputs(json, (err, resp) => {
        if (err) {
          console.log('test3')
          res.writeHead(400)
          res.end()
          return
        }
        json = resp
        addProduct(json.name, parseFloat(json.price), parseFloat(json.weight), (err, msg) => {
          if (err) {
            res.writeHead(400)
            res.end()
            return
          }
          console.log(msg)
          res.end(msg)
        })
      })
    })
  } else if (req.method === 'PUT') {

  }
}

function getData(req, callback) {
  let data = ''
  req.on('data', (chunk) => {
    data += chunk;
  })
  req.on('end', () => {
    callback(null, data)
  })
}

function addProduct(name, price, weight, callback) {
  let id = products[productsLength - 1].id + 1
  let newproduct = { // conditions
    'id': id,
    'name': name,
    'price': price,
    'weight': weight
  }
  products[productsLength] = newproduct
  fs.writeFile('./products/data.JSON', '{"products": ' + products + '}', (err) => {
    if (err) throw err
    productsLength = products.length
    callback(null, 'Product added')
  })
}

module.exports = {
  main: main,
  // sortBy: sortBy,
  addProduct: addProduct,
  productsLength: productsLength
}
