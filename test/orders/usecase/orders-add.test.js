const add = require('../../../orders/usecase/add')

describe(':add(orderId, orderData, orders, fileHandlers)', () => {
  describe('When everything fine', () => {
    it('calls fileHandlers.write', () => {
      const orderId = 1
      const fileHandlers = {orders: {read: jest.fn(() => { return {orders: []} }),
        write: jest.fn()}}
      add(orderId, {}, fileHandlers)
      expect(fileHandlers.orders.write).toBeCalled()
    })
    it('returns orders updated', () => {
      const orderId = 1
      const orderData = 'fake data'
      const orders = [{id: orderId, value: orderData}]
      const fileHandlers = {orders: {read: jest.fn(() => { return {orders: []} }),
        write: jest.fn()}}
      expect(add(orderId, orderData, fileHandlers)).toEqual(orders)
    })
  })
})
