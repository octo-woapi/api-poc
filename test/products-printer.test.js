const printer = require('../products/printer.js')
const fs = require('fs')

describe('.getProducts()', () => {
  test('get a JSON', () => {
    // Given
    const productsJSON = JSON.parse(fs.readFileSync('./products/data.json', 'utf8'))
    const products = productsJSON.products
    // When
    expect(products).toEqual(printer.getProducts())
  })
})