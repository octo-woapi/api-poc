const fs = require('fs')

const productsJSON = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'))
const products = productsJSON.products

module.exports = {
  productsLength: products.length,
  getParams: function (url) {
    let pair
    let json = {}
    let values = url.slice(url.indexOf('?') + 1).split('&')
    for (let i = 0; i < values.length; i++) {
      pair = values[i].split('=')
      json[pair[0]] = pair[1]
    }
    return json
  },
  connerieThrowException: function () {
    throw new Error('test Exception')
  }
}
