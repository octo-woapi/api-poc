const add = require('../../../orders/usecase/add')

describe(':add(orderId, orderData, orders, fileHandlers)', () => {
  describe('When everything fine', () => {
    it('calls fileHandlers.write', () => {
      const orderId = 1
      const fileHandlers = {orders: {read: jest.fn(() => { return {orders: []} }),
        write: jest.fn()}}
      const format = jest.fn(() => { return {} })
      const priceUpdate = jest.fn()
      add(orderId, {}, format, priceUpdate, fileHandlers)
      expect(fileHandlers.orders.write).toBeCalled()
    })
    it('returns orders updated', () => {
      const orderId = 1
      const orderData = 'fake data'
      const format = jest.fn(() => { return orderData })
      const orders = [{id: orderId, value: orderData}]
      const fileHandlers = {orders: {read: jest.fn(() => { return {orders: []} }),
        write: jest.fn()}}
      const priceUpdate = jest.fn(() => { return orderData })
      expect(add(orderId, orderData, format, priceUpdate, fileHandlers)).toEqual(orders)
    })
  })
  it('calls format', () => {
    const orderId = 1
    const orderData = {productsList: [{product_name: 'banana', quantity: 100}]}
    const format = jest.fn()
    const fileHandlers = {orders: {read: jest.fn(() => { return {orders: []} }),
      write: jest.fn()}}
    const priceUpdate = jest.fn()
    add(orderId, orderData, format, priceUpdate, fileHandlers)
    expect(format).toBeCalledWith(orderData)
  })
  it('calls updatePrice', () => {
    const orderId = 1
    const orderData = {productsList: [{product_name: 'banana', quantity: 100}]}
    const format = jest.fn()
    const fileHandlers = {orders: {read: jest.fn(() => { return {orders: []} }),
      write: jest.fn()}}
    const priceUpdate = jest.fn()
    add(orderId, orderData, format, priceUpdate, fileHandlers)
    expect(format).toBeCalledWith(orderData)
  })
})
