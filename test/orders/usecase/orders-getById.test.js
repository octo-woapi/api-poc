const getById = require('../../../orders/usecase/getById')

describe(':getById(:id, :fileHandlers)', () => {
  describe('when everything is fine', () => {
    it('returns the order wanted', () => {
      // Given
      const id = 1
      const fileHandlers = {orders: {read: jest.fn(() => { return { orders: [{id: id}] } })}}
      // When
      const order = getById.getById(fileHandlers.orders, id)
      // Then
      expect(order).toEqual({id: 1})
    })
  })
  describe('when the order is not in the list', () => {
    it('throw OrderNotFoundError', () => {
      // Given
      const fileHandlers = {orders: {read: jest.fn(() => { return { orders: [] } })}}
      const id = 1
      expect(() => {
        // When
        getById.getById(fileHandlers.orders, id)
        // Then
      }).toThrow(getById.OrderNotFoundError)
    })
  })
})