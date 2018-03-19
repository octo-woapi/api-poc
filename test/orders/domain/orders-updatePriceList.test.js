const updateTotalsList = require('../../../orders/domain/updateTotalsList')

describe('updateTotalsList(:orders, :getProductById)', () => {
  describe('when orders is empty', () => {
    it('returns orders', () => {
      const orders = []
      const getProductById = jest.fn()
      expect(updateTotalsList(orders, getProductById)).toBe(orders)
    })
  })
})
