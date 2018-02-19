const fs = require('fs')

const productsJSON = JSON.parse(fs.readFileSync('products.json'))
const products = productsJSON.products

module.exports = {
  productsLength: products.length,
  getProducts: function () {
    return products
  },
  addProduct: function (name, price, weight) {
    let id = products.length + 1
    let newproduct = { // conditions
      'id': id,
      'name': name,
      'price': price,
      'weight': weight
    }
    products[id - 1] = newproduct
    /* fs.writeFile('products.JSON', '{"products": ' + products + '}', (err) => {
      if (err) throw err
      console.log('Product has been added')
    }) */
  },
  getPostValues: function (url) {
    var pair
    var json = {}
    var values = url.slice(url.indexOf('?') + 1).split('&')
    for (var i = 0; i < values.length; i++) {
      pair = values[i].split('=')
      json[pair[0]] = pair[1]
    }
    return json
  },
  connerieThrowException: function () {
    throw new Error('test Exception')
  }
}
