const fs = require('fs')
const tools = require('../tools.js')

const productsJSON = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'))
const products = productsJSON.products
let productsLength = products.length

function main (req, res, route, params) {
  if (req.method === 'GET') {
    if (route.length > 1) {
      if (typeof parseInt(route[1]) === 'number') {
        let product = getProduct(route[1])
        console.log(product)
      } else if (params !== null) {
        if (params.sort) {

          //sortBy(products, field, parseInt)
        }
      } else {
        console.log('test')
      }
    } else {
      console.log(getProducts())
    }
  } else if (req.method === 'POST') {
    req.on('data', (chunk) => {
      let json = tools.getParams(chunk.toString('utf8'))
      validateInputs(json, (err, data) => {
        if (err) throw err
        json = data
        addProduct(json.name, parseFloat(json.price), parseFloat(json.weight), (err, msg) => {
          if (err) throw err
          console.log(msg)
        })
      })
    })
  } else if (req.method === 'PUT') {

  }
}

function getProducts () {
  return products
}

function getProduct (id) {
  for (let product in products) {
    if (products[product].id === id) {
      return products[product]
    }
  }
}

function validateInputs (inputs, callback) {
  if (typeof inputs.name === 'undefined' || !inputs.name) {
    callback(new Error('Name of the product is undefined'))
  } else {
    if (typeof inputs.price === 'undefined' || !inputs.price) {
      inputs.price = 0
    }
    if (typeof inputs.weight === 'undefined' || !inputs.weight) {
      inputs.weight = 0
    }
    callback(null, inputs)
  }
}

/* function sortBy (JSON, field, primer) {
  let key = primer
    ? function (x) { return primer(x[field]) }
    : function (x) { return x[field] }

  field = !field ? 1 : -1

  return function (a, b) {
    return a = key(a), b = key(b), field * ((a > b) - (b > a))
  }
} */

function addProduct (name, price, weight, callback) {
  let id = products[productsLength - 1].id + 1
  let newproduct = { // conditions
    'id': id,
    'name': name,
    'price': price,
    'weight': weight
  }
  products[productsLength] = newproduct
  fs.writeFile('products.JSON', '{"products": ' + products + '}', (err) => {
    if (err) throw err
    productsLength = products.length
    callback(null, 'Product added')
  })
}

module.exports = {
  main: main,
  getProducts: getProducts,
  getProduct: getProduct,
  sortBy: sortBy,
  addProduct: addProduct,
  productsLength: productsLength
}
