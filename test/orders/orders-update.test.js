const update = require('../../orders/update')

describe('update(:orderId, :orderData)', () => {
  describe('When everything fine', () => {
    it('calls fileHandlers.read', () => {
      const fileHandlers = { orders: {
        read: jest.fn(() => { return { orders: [{id: 1, value: orderData}] } }),
        write: jest.fn()
      }}
      const orderData = 'fake data'
      const orderId = 1
      const format = jest.fn(() => { return orderData })
      update(orderId, orderData, format, fileHandlers)
      expect(fileHandlers.orders.read).toBeCalled()
    })
    it('calls fileHandlers.write', () => {
      const fileHandlers = { orders: {
        read: jest.fn(() => { return { orders: [{id: 1, value: orderData}] } }),
        write: jest.fn()
      }}
      const orderData = 'fake data'
      const orderId = 1
      const format = jest.fn(() => { return orderData })
      update(orderId, orderData, format, fileHandlers)
      expect(fileHandlers.orders.write).toBeCalled()
    })
    it('calls format', () => {
      const fileHandlers = { orders: {
        read: jest.fn(() => { return { orders: [{id: 1, value: orderData}] } }),
        write: jest.fn()
      }}
      const orderData = 'fake data'
      const orderId = 1
      const format = jest.fn(() => { return orderData })
      update(orderId, orderData, format, fileHandlers)
      expect(format).toBeCalled()
    })
    it('returns orders', () => {
      const orderId = 1
      const orderData = 'updated fake data'
      const orders = [{id: 1, value: orderData}]
      const fileHandlers = { orders: {
        read: jest.fn(() => { return { orders: [{id: 1, value: orderData}] } }),
        write: jest.fn()
      }}
      const format = jest.fn(() => { return orderData })
      expect(orders).toEqual(update(orderId, orderData, format, fileHandlers))
    })
  })
  describe('when the user wants to add a product to the order', () => {
    it('returns orders updated with only the products')
  })
})
