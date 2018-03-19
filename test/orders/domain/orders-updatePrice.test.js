const updateTotals = require('../../../orders/domain/updateTotals')

describe('updateTotals(:order, :getProductById)', () => {
  describe('When productsList is empty', () => {
    it('returns order', () => {
      const order = {productsList: []}
      const getProductById = jest.fn()
      expect(updateTotals(order, getProductById)).toBe(order)
    })
  })
  describe('When productsList is not empty', () => {
    it('calls getProductById', () => {
      const productId = 1
      const order = {productsList: [{id: productId}]}
      const getProductById = jest.fn(() => {
        return {id: 1, name: 'banana', price: 2, weight: 0.5}
      })
      updateTotals(order, getProductById)
      expect(getProductById).toBeCalledWith(productId)
    })
    it('calculates total weight', () => {
      const quantity = 1000
      const productWeight = 0.2
      const order = {productsList: [{id: 1, name: 'banana', quantity: quantity}]}
      const getProductById = jest.fn(() => {
        return {id: 0, name: 'banana', price: 2, weight: productWeight}
      })
      const updatedWeight = updateTotals(order, getProductById).weight
      expect(updatedWeight).toEqual(quantity * productWeight)
    })
  })
})
