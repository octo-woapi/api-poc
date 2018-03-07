const priceUpdate = require('../../orders/updatePrice')

describe('priceUpdate(:order, :getProductData)', () => {
  describe('When productsList is empty', () => {
    it('returns order', () => {
      const order = {productsList: []}
      expect(priceUpdate(order)).toBe(order)
    })
  })
  describe('When productsList is not empty', () => {
    it('calls getProductData.getData', () => {
      const productId = 1
      const order = {productsList: [{id: productId}]}
      const getProductData = {getData: jest.fn()}
      priceUpdate(order, getProductData)
      expect(getProductData.getData).toBeCalledWith(productId)
    })
    it('calculates the total weight', () => {
      const quantity = 1000
      const productWeight = 0.2
      const order = {productsList: [{id: 1, name: 'banana', quantity: 100}]}
      const getProductData = jest.fn(() => {
        return {id: 0, name: 'banana', price: 2, weight: 0.2}
      })
      const updatedWeight = priceUpdate(order, getProductData).weight
      expect(updatedWeight).toEqual(quantity * productWeight)
    })
  })
})
