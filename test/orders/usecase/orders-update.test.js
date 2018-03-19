const updateModule = require('../../../orders/usecase/update')

describe('update(:fileHandler, :orderId, :orderData)', () => {
  describe('When everything fine', () => {
    it('calls fileHandlers.read', () => {
      const fileHandlers = {
        orders: {
          read: jest.fn(() => { return {orders: [{id: 1, value: orderData}]} }),
          write: jest.fn()
        }
      }
      const orderData = '{}'
      const orderId = 1
      const {update} = updateModule(fileHandlers.orders)
      update(orderId, orderData)
      expect(fileHandlers.orders.read).toBeCalled()
    })
    it('calls fileHandlers.write', () => {
      const fileHandlers = {
        orders: {
          read: jest.fn(() => { return {orders: [{id: 1, value: orderData}]} }),
          write: jest.fn()
        }
      }
      const orderData = '{}'
      const orderId = 1
      const {update} = updateModule(fileHandlers.orders)
      update(orderId, orderData)
      expect(fileHandlers.orders.write).toBeCalled()
    })
    it('returns orders', () => {
      const orderId = 1
      const orderData = '{}'
      const orders = [JSON.parse(orderData)]
      const fileHandlers = {
        orders: {
          read: jest.fn(() => { return {orders: [JSON.parse(orderData)]} }),
          write: jest.fn()
        }
      }
      const {update} = updateModule(fileHandlers.orders)
      expect(JSON.stringify(orders)).toEqual(JSON.stringify(update(orderId, orderData)))
    })
  })
})
