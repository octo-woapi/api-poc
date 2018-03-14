const updatePriceList = require('../../../orders/domain/updatePriceList')

describe('updatePriceList(:orders, :getProductById)', () => {
  describe('when orders is empty', () => {
    it('returns orders', () => {
      const orders = []
      const getProductById = jest.fn()
      expect(updatePriceList(orders, getProductById)).toBe(orders)
    })
  })
})
