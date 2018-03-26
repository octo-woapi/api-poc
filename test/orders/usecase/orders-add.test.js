const fileHandlers = {orders: {read: jest.fn(() => []),
  write: jest.fn()}}

const {add} = require('../../../orders/usecase/add')(fileHandlers.orders)

describe(':add(orderId, orderData, orders)', () => {
  describe('When everything fine', () => {
    it('calls fileHandlers.write', () => {
      const orderId = 1
      add(orderId, '{}')
      expect(fileHandlers.orders.write).toBeCalled()
    })
    it('returns orders updated', () => {
      const orderId = 1
      const orderData = {id:1, productsList: []}
      const orders = [{id: orderId, productsList: orderData.productsList}]
      expect(add(orderId, orderData)).toEqual(orders)
    })
  })
})
