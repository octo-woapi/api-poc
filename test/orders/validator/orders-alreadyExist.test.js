const alreadyExistModule = require('../../../orders/validator/alreadyExist')

describe(':alreadyExist(:fileHandler, :orderId)', () => {
  describe('When an order with orderId already exist', () => {
    it('return true', () => {
      const orderId = 1
      const orders = [{id: 1, productsList: []}]
      const fileHandlers = {orders: {read: jest.fn(() => orders)}}
      const {alreadyExist} = alreadyExistModule(fileHandlers.orders)
      expect(alreadyExist(orderId)).toBe(true)
    })
  })
  describe('When an order with orderId doesn\'t exist', () => {
    it('return false', () => {
      const orderId = 2
      const orders = [{id: 1}]
      const fileHandlers = {orders: {read: jest.fn(() => orders)}}
      const {alreadyExist} = alreadyExistModule(fileHandlers.orders)
      expect(alreadyExist(orderId)).toBe(false)
    })
  })
})