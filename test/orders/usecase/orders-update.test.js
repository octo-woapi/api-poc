const update = require('../../../orders/usecase/update')

describe('update.update(:orderId, :orderData)', () => {
  describe('When everything fine', () => {
    it('calls fileHandlers.read', () => {
      const fileHandlers = { orders: {
        read: jest.fn(() => { return { orders: [{id: 1, value: orderData}] } }),
        write: jest.fn()
      }}
      const orderData = 'fake data'
      const orderId = 1
      update(orderId, orderData, fileHandlers)
      expect(fileHandlers.orders.read).toBeCalled()
    })
    it('calls fileHandlers.write', () => {
      const fileHandlers = { orders: {
        read: jest.fn(() => { return { orders: [{id: 1, value: orderData}] } }),
        write: jest.fn()
      }}
      const orderData = 'fake data'
      const orderId = 1
      update(orderId, orderData, fileHandlers)
      expect(fileHandlers.orders.write).toBeCalled()
    })
    it('returns orders', () => {
      const orderId = 1
      const orderData = 'updated fake data'
      const orders = [{id: 1, value: orderData}]
      const fileHandlers = { orders: {
        read: jest.fn(() => { return { orders: [{id: 1, value: orderData}] } }),
        write: jest.fn()
      }}
      expect(orders).toEqual(update(orderId, orderData, fileHandlers))
    })
  })
})
