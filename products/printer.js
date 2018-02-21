const fs = require('fs')

const productsJSON = JSON.parse(fs.readFileSync('./products/data.json', 'utf8'))
const products = productsJSON.products
let productsLength = products.length

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

module.exports = {
  getProducts,
  getProduct,
  productsLength
}