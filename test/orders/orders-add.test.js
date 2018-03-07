const add = require('../../orders/add')

describe(':add(orderId, orderData, orders, fileHandlers)', () => {
  describe('When everything fine', () => {
    it('calls fileHandlers.write', () => {
      const orderId = 1
      const fileHandlers = {orders: {read: jest.fn(() => { return {orders: []} }),
        write: jest.fn()}}
      const format = jest.fn(() => { return {} })
      add(orderId, {}, format, fileHandlers)
      expect(fileHandlers.orders.write).toBeCalled()
    })
    it('returns orders updated', () => {
      const orderId = 1
      const orderData = 'fake data'
      const format = jest.fn(() => { return orderData })
      const orders = [{id: orderId, value: orderData}]
      const fileHandlers = {orders: {read: jest.fn(() => { return {orders: []} }),
          write: jest.fn()}}
      expect(add(orderId, orderData, format, fileHandlers)).toEqual(orders)
    })
  })
  it('calls format', () => {
    const orderId = 1
    const orderData = {productsList: [{product_name: 'banana', quantity: 100}]}
    const format = jest.fn()
    const fileHandlers = {orders: {read: jest.fn(() => { return {orders: []} }),
        write: jest.fn()}}
    add(orderId, orderData, format, fileHandlers)
    expect(format).toBeCalledWith(orderData)
  })
})
