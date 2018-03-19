const get = require('../../../products/usecase/getList.js')

describe('.getList(:fileHandler)', () => {
  describe('When everything is fine', () => {
    test('return products', () => {
      const products = ['something']
      const fileHandlers = {products: {read: jest.fn(() => { return { products: products } })}}
      expect(get(fileHandlers.products).getList).toEqual(products)
    })
  })
})


