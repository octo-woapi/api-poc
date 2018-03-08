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
      const format = jest.fn(() => { return orderData })
      const isValidOrder = jest.fn(() => { return true })
      const priceUpdate = jest.fn(() => { return orderData })
      update.update(orderId, orderData, format, isValidOrder, priceUpdate, fileHandlers)
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
      const isValidOrder = jest.fn(() => { return true })
      const priceUpdate = jest.fn(() => { return orderData })
      update.update(orderId, orderData, format, isValidOrder, priceUpdate, fileHandlers)
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
      const isValidOrder = jest.fn(() => { return true })
      const priceUpdate = jest.fn(() => { return orderData })
      update.update(orderId, orderData, format, isValidOrder, priceUpdate, fileHandlers)
      expect(format).toBeCalledWith(orderData)
    })
    it('calls isValidOrder', () => {
      const fileHandlers = { orders: {
        read: jest.fn(() => { return { orders: [{id: 1, value: orderData}] } }),
        write: jest.fn()
      }}
      const orderData = 'fake data'
      const orderId = 1
      const format = jest.fn(() => { return orderData })
      const isValidOrder = jest.fn(() => { return true })
      const priceUpdate = jest.fn(() => { return orderData })
      update.update(orderId, orderData, format, isValidOrder, priceUpdate, fileHandlers)
      expect(isValidOrder).toBeCalledWith(orderData)
    })
    it('calls priceUpdate', () => {
      const fileHandlers = { orders: {
        read: jest.fn(() => { return { orders: [{id: 1, value: orderData}] } }),
        write: jest.fn()
      }}
      const orderData = 'fake data'
      const orderId = 1
      const format = jest.fn(() => { return orderData })
      const isValidOrder = jest.fn(() => { return true })
      const priceUpdate = jest.fn(() => { return orderData })
      update.update(orderId, orderData, format, isValidOrder, priceUpdate, fileHandlers)
      expect(isValidOrder).toBeCalledWith(orderData)
    })
    it('returns orders', () => {
      const orderId = 1
      const orderData = 'updated fake data'
      const orders = [{id: 1, value: orderData}]
      const fileHandlers = { orders: {
        read: jest.fn(() => { return { orders: [{id: 1, value: orderData}] } }),
        write: jest.fn()
      }}
      const isValidOrder = jest.fn(() => { return true })
      const format = jest.fn(() => { return orderData })
      const priceUpdate = jest.fn(() => { return orderData })
      expect(orders).toEqual(update.update(orderId, orderData, format, isValidOrder, priceUpdate, fileHandlers))
    })
  })
  describe('when orderData is not valid', () => {
    it('throws InvalidOrderFormatError', () => {
      const orderId = 1
      const orderData = 'fake data'
      const fileHandlers = { orders: {
        read: jest.fn(() => { return { orders: [{id: 1, value: orderData}] } }),
        write: jest.fn()
      }}
      const isValidOrder = jest.fn(() => { return false })
      const format = jest.fn(() => { return orderData })
      const priceUpdate = jest.fn(() => { return orderData })
      expect(() => {
        update.update(orderId, orderData, format, isValidOrder, priceUpdate, fileHandlers)
      }).toThrow(update.InvalidOrderFormatError)
    })
  })
})
