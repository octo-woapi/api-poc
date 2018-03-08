const validator = require('../../../orders/validator/alreadyExist')

describe(':alreadyExist(:orderId, :orders', () => {
  describe('When an order with orderId already exist', () => {
    it('return true', () => {
      const orderId = 1
      const orders = [{id: 1}]
      expect(validator.alreadyExist(orderId, orders)).toBe(true)
    })
  })
  describe('When an order with orderId doesn\'t exist', () => {
    it('return false', () => {
      const orderId = 2
      const orders = [{id: 1}]
      expect(validator.alreadyExist(orderId, orders)).toBe(false)
    })
  })
})