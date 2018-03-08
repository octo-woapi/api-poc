const updatePrice = require('../../../orders/domain/updatePrice')

describe('updatePrice(:order, :getProductById)', () => {
  describe('When productsList is empty', () => {
    it('returns order', () => {
      const order = {productsList: []}
      const calculateShippingAmount = jest.fn()
      const getProductById = jest.fn()
      const applyDiscount = jest.fn()
      expect(updatePrice(order, getProductById, {}, calculateShippingAmount,
        applyDiscount)).toBe(order)
    })
  })
  describe('When productsList is not empty', () => {
    it('calls getProductById', () => {
      const productId = 1
      const order = {productsList: [{id: productId}]}
      const getProductById = jest.fn(() => {
        return {id: 1, name: 'banana', price: 2, weight: 0.5}
      })
      const fileHandlers = {}
      const calculateShippingAmount = jest.fn()
      const applyDiscount = jest.fn()
      updatePrice(order, getProductById, fileHandlers, calculateShippingAmount, applyDiscount)
      expect(getProductById).toBeCalledWith(fileHandlers, productId)
    })
    it('calculates the total weight', () => {
      const quantity = 1000
      const productWeight = 0.2
      const order = {productsList: [{id: 1, name: 'banana', quantity: quantity}]}
      const getProductById = jest.fn(() => {
        return {id: 0, name: 'banana', price: 2, weight: productWeight}
      })
      const fileHandlers = {}
      const calculateShippingAmount = jest.fn()
      const applyDiscount = jest.fn()
      const updatedWeight = updatePrice(order, getProductById, fileHandlers,
        calculateShippingAmount, applyDiscount).weight
      expect(updatedWeight).toEqual(quantity * productWeight)
    })
    it('calls calculateShippingAmount', () => {
      const quantity = 1000
      const productWeight = 0.2
      const order = {productsList: [{id: 1, name: 'banana', quantity: quantity}]}
      const getProductById = jest.fn(() => {
        return {id: 0, name: 'banana', price: 2, weight: productWeight}
      })
      const fileHandlers = {}
      const calculateShippingAmount = jest.fn()
      const applyDiscount = jest.fn()
      const updatedWeight = updatePrice(order, getProductById, fileHandlers,
        calculateShippingAmount, applyDiscount).weight
      expect(calculateShippingAmount).toBeCalledWith(updatedWeight)
    })
    it('calls applyDiscount', () => {
      const quantity = 1000
      const productPrice = 0.2
      const order = {productsList: [{id: 1, name: 'banana', quantity: quantity}]}
      const getProductById = jest.fn(() => {
        return {id: 0, name: 'banana', price: productPrice, weight: 0}
      })
      const fileHandlers = {}
      const SHIPPING_AMOUNT = 500
      const calculateShippingAmount = jest.fn(() => { return SHIPPING_AMOUNT })
      const applyDiscount = jest.fn(() => { return quantity * productPrice + SHIPPING_AMOUNT })
      const updatedPrice = updatePrice(order, getProductById, fileHandlers,
        calculateShippingAmount, applyDiscount).totalAmount
      expect(applyDiscount).toBeCalledWith(updatedPrice)
    })
  })
})
