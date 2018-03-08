const isValidOrder = require('../../../orders/validator/isValidOrder')

describe('isValidOrder(:orderData)', () => {
  describe('when orderData.id or orderData.productsList is undefined', () => {
    it('returns false', () => {
      const orderData = {}
      expect(isValidOrder(orderData)).toBe(false)
    })
  })
  describe('when orderData.productsList is not an array', () => {
    it('returns false', () => {
      const orderData = {
        id: 1,
        productsList: 'falsy productsList'
      }
      expect(isValidOrder(orderData)).toBe(false)
    })
  })
  describe('when everything is fine', () => {
    it('returns true', () => {
      const orderData = {
        id: 1,
        productsList: []
      }
      expect(isValidOrder(orderData)).toBe(true)
    })
  })

})
