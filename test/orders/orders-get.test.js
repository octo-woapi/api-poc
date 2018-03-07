const get = require('../../orders/get')

describe('getList(:fileHandlers, :getById, :orderId)', () => {
  it('calls fileHandlers.orders.read', () => {
    const fileHandlers = {orders: {read: jest.fn(() => { return { orders: [] } })}}
    get.getList(fileHandlers)
    expect(fileHandlers.orders.read).toBeCalled()
  })
  describe('when everything is fine', () => {
    it('returns orders', () => {
      const fileHandlers = {orders: {read: jest.fn(() => { return { orders: [] } })}}
      const returnOrders = get.getList(fileHandlers)
      expect(returnOrders).toEqual([])
    })
  })
})

describe(':getById(:id, :fileHandlers)', () => {
  describe('when everything is fine', () => {
    it('returns the order wanted', () => {
      const id = 1
      const fileHandlers = {orders: {read: jest.fn(() => { return { orders: [{id: id}] } })}}
      const order = get.getById(id, fileHandlers)
      expect(order).toEqual({id: 1})
    })
  })
  describe('when the order is not in the list', () => {
    it('throw OrderNotFoundError', () => {
      const fileHandlers = {orders: {read: jest.fn(() => { return { orders: [] } })}}
      const id = 1
      expect(() => {
        get.getById(id, fileHandlers)
      }).toThrow(get.OrderNotFoundError)
    })
  })
})
