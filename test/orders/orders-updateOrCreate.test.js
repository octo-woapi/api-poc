const updateOrCreate = require('../../orders/updateAndCreate')

describe('updateOrCreate(:orderId, :orderData, :alreadyExist, :update, :add, :filHandler)', () => {
  describe('When id already exists', () => {
    it('calls alreadyExists with orderId and orders', () => {
      const orderId = 1
      const alreadyExist = jest.fn(() => true)
      const fileHandlers = { orders: {
        read: jest.fn(() => {
          return {orders: [{}]}
        })
      }}
      const update = jest.fn()
      const add = jest.fn()
      // When
      updateOrCreate(orderId, {}, alreadyExist, update, add, fileHandlers)
      // Then
      expect(alreadyExist).toBeCalledWith(orderId, [{}])
    })
    it('calls update with orderId and orderData and fileHandlers', () => {
      const orderId = 1
      const orderData = 'fake data'
      const alreadyExist = jest.fn(() => true)
      const update = jest.fn()
      const add = jest.fn()
      const fileHandlers = { orders: {
        read: jest.fn(() => {
          return {orders: [{}]}
        })
      }}
      // When
      updateOrCreate(orderId, orderData, alreadyExist, update, add, fileHandlers)
      // Then
      expect(update).toBeCalledWith(orderId, orderData, fileHandlers)
    })
    it('returns what update returns', () => {
      const orderId = 1
      const orderData = 'fake data'
      const alreadyExist = jest.fn(() => true)
      const update = jest.fn(() => 'fake updated order')
      const add = jest.fn()
      const fileHandlers = { orders: {
        read: jest.fn(() => {
          return {orders: [{}]}
        })
      }}
      // When
      const order = updateOrCreate(orderId, orderData, alreadyExist, update, add, fileHandlers)
      // Then
      expect(order).toEqual('fake updated order')
    })
    it('calls add with orderId, orderData and fileHandlers', () => {
      const orderId = 1
      const orderData = 'fake data'
      const alreadyExist = jest.fn(() => false)
      const add = jest.fn()
      const update = jest.fn()
      const fileHandlers = { orders: {
        read: jest.fn(() => {
          return {orders: [{}]}
        })
      }}
      // When
      updateOrCreate(orderId, orderData, alreadyExist, update, add, fileHandlers)
      // Then
      expect(add).toBeCalledWith(orderId, orderData, fileHandlers)
    })
    it('returns what add returns', () => {
      const orderId = 1
      const orderData = 'fake data'
      const alreadyExist = jest.fn(() => false)
      const update = jest.fn()
      const add = jest.fn(() => 'fake updated order')
      const fileHandlers = { orders: {
        read: jest.fn(() => {
          return {orders: [{}]}
        })
      }}
      // When
      const order = updateOrCreate(orderId, orderData, alreadyExist, update, add, fileHandlers)
      // Then
      expect(order).toEqual('fake updated order')
    })
  })
})
