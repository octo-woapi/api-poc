const getData = require('../products/getData.js')
const fs = require('fs')
const env = process.env.NODE_ENV || 'development'
const conf = require('../server/conf')[env]

const productsJSON = JSON.parse(fs.readFileSync(conf.data.products, 'utf8'))
const products = productsJSON.products

describe('.getProducts()', () => {
  describe('When everything is fine', () => {
    test('return products', () => {
      expect(products).toEqual(getData.getProducts())
    })
  })
})

describe('.getProduct(:id)', () => {
  describe('When everything fine', () => {
    test('return JSON', () => {
      expect(products[0]).toEqual(getData.getProduct(0))
    })
  })
  describe('When id is undefined', () => {
    test('throw invalidArgumentError', () => {
      const id = undefined
      expect(() => {
        getData.getProduct(id)
      }).toThrow(getData.InvalidArgumentError)
    })
  })
})
