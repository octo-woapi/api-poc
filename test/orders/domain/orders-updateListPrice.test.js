const updateListPrice = require('../../../orders/domain/updateListPrice')

describe('updateListPrice(:orders, :updatePrice)', () => {
  describe('when orders is empty', () => {
    it('returns orders', () => {
      const orders = []
      expect(updateListPrice(orders)).toBe(orders)
    })
  })
  describe('when orders is not empty', () => {
    it('calls updatePrice with order', () => {
      const order = {}
      const orders = [order]
      const updatePrice = jest.fn()
      updateListPrice(orders, updatePrice)
      expect(updatePrice).toBeCalledWith(order)
    })
  })
})
