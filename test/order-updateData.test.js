const update = require('../orders/updateData')

describe('update(:orderId, :orderData)', () => {
  describe('When everything fine', () => {
    it('calls fileHandler.read', () => {
      const fileHandler = {
        read: jest.fn(),
        write: jest.fn()
      }
      const orderData = 'fake data'
      const orderId = 1
      update.updateOrdersList(orderId, orderData, fileHandler)
      expect(fileHandler.read).toBeCalled()
    })
    it('calls fileHandler.write', () => {
      const fileHandler = {
        read: jest.fn(),
        write: jest.fn()
      }
      const orderData = 'fake data'
      const orderId = 1
      update.updateOrdersList(orderId, orderData, fileHandler)
      expect(fileHandler.write).toBeCalled()
    })
    it('returns orders', () => {
      const orders = ['fake data']
      const orderId = 1
      const orderData = 'updated fake data'
      const fileHandler = {
        read: jest.fn(() => { return JSON.stringify({orders: ['fake data']}) }),
        write: jest.fn()
      }
      expect(orders).toEqual(update.updateOrdersList(orderId, orderData, fileHandler))
    })
    it('updates orders', () => {
      let orders = [{id: 1, value: 'fake data'}]
      const orderId = 1
      const orderData = 'fake updated data'
      const fileHandler = {
        read: jest.fn(() => { return JSON.stringify({orders: orders}) }),
        write: jest.fn()
      }
      orders = update.updateOrdersList(orderId, orderData, fileHandler)
      expect(orders[update.findOrderIndexFromId(orders, orderId)].value).toEqual(orderData)
    })
  })
})
