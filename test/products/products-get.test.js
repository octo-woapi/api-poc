const get = require('../../products/get.js')
const fs = require('fs')
const env = process.env.NODE_ENV || 'development'
const conf = require('../../server/conf')[env]

const productsJSON = JSON.parse(fs.readFileSync(conf.data.products, 'utf8'))
const products = productsJSON.products

describe('.getList()', () => {
  describe('When everything is fine', () => {
    test('return products', () => {
      expect(products).toEqual(get.getList())
    })
  })
})

describe('.getById(:id)', () => {
  describe('When everything fine', () => {
    test('return JSON', () => {
      expect(products[0]).toEqual(get.getById(0))
    })
  })
  describe('When id is undefined', () => {
    test('throw invalidArgumentError', () => {
      const id = undefined
      expect(() => {
        get.getById(id)
      }).toThrow(get.InvalidArgumentError)
    })
  })
})
