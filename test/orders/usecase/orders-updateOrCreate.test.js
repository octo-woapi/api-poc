const updateOrCreate = require('../../../orders/usecase/updateAndCreate')

describe('updateOrCreate(:orderId, :orderData, :alreadyExist, :update, :add, ' +
  ':filHandlers, :format, :updateListPrice)', () => {
  describe('when everything is fine', () => {
    it('calls format with orderData', () => {
      const orderId = 1
      const orderData = 'fake data'
      const isValidOrder = jest.fn(() => { return true })
      const alreadyExist = jest.fn()
      const update = jest.fn()
      const add = jest.fn()
      const format = jest.fn()
      const fileHandlers = {
        orders: {
          read: jest.fn(() => {
            return {orders: [{}]}
          })
        }
      }
      const updateListPrice = jest.fn()
      updateOrCreate(orderId, orderData, isValidOrder, alreadyExist, update, add,
        fileHandlers, format, updateListPrice)
      expect(format).toBeCalledWith(orderData)
    })
    it('calls updatePriceList with updated orders', () => {
      const orderId = 1
      const orderData = 'fake data'
      const orderDataUpdated = 'updated fake data'
      const isValidOrder = jest.fn(() => true)
      const alreadyExist = jest.fn(() => true)
      const update = jest.fn(() => orderDataUpdated)
      const add = jest.fn()
      const fileHandlers = {
        orders: {
          read: jest.fn(() => {
            return {orders: [{}]}
          })
        }
      }
      const format = jest.fn(() => orderData)
      const updateListPrice = jest.fn()
      updateOrCreate(orderId, orderData, isValidOrder, alreadyExist, update, add,
        fileHandlers, format, updateListPrice)
      expect(updateListPrice).toBeCalledWith(orderDataUpdated)
    })
  })
  describe('When id already exists', () => {
    it('calls alreadyExists with orderId and orders', () => {
      const orderId = 1
      const orderData = {}
      const alreadyExist = jest.fn()
      const fileHandlers = {
        orders: {
          read: jest.fn(() => {
            return {orders: [{}]}
          })
        }
      }
      const update = jest.fn()
      const add = jest.fn()
      const format = jest.fn()
      const updateListPrice = jest.fn()
      const isValidOrder = jest.fn(() => true)
      // When
      updateOrCreate(orderId, orderData, isValidOrder, alreadyExist, update, add,
        fileHandlers, format, updateListPrice)
      // Then
      expect(alreadyExist).toBeCalledWith(orderId, [{}])
    })
    it('calls update with orderId, orderData and fileHandlers', () => {
      const orderId = 1
      const orderData = 'fake data'
      const alreadyExist = jest.fn(() => true)
      const update = jest.fn()
      const add = jest.fn()
      const fileHandlers = {
        orders: {
          read: jest.fn(() => {
            return {orders: [{}]}
          })
        }
      }
      const format = jest.fn(() => orderData)
      const updateListPrice = jest.fn()
      const isValidOrder = jest.fn(() => true)
      // When
      updateOrCreate(orderId, orderData, isValidOrder, alreadyExist, update, add,
        fileHandlers, format, updateListPrice)
      // Then
      expect(update).toBeCalledWith(orderId, orderData, fileHandlers)
    })
    it('returns what update returns', () => {
      const orderId = 1
      const orderData = 'fake data'
      const orderDataUpdated = 'fake updated order'
      const alreadyExist = jest.fn(() => true)
      const update = jest.fn(() => [orderDataUpdated])
      const add = jest.fn()
      const fileHandlers = {
        orders: {
          read: jest.fn(() => {
            return {orders: [{}]}
          })
        }
      }
      const format = jest.fn(() => orderData)
      const updateListPrice = jest.fn(() => [orderDataUpdated])
      const isValidOrder = jest.fn(() => true)
      // When
      const orders = updateOrCreate(orderId, orderData, isValidOrder, alreadyExist,
        update, add, fileHandlers, format, updateListPrice)
      // Then
      expect(orders).toEqual([orderDataUpdated])
    })
  })
  describe('when id does not exist', () => {
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
      const format = jest.fn(() => orderData)
      const updateListPrice = jest.fn()
      const isValidOrder = jest.fn(() => true)
      // When
      updateOrCreate(orderId, orderData, isValidOrder, alreadyExist, update,
        add, fileHandlers, format, updateListPrice)
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
      const format = jest.fn(() => orderData)
      const updateListPrice = jest.fn(() => 'fake updated order' )
      const isValidOrder = jest.fn(() => true)
      // When
      const order = updateOrCreate(orderId, orderData, isValidOrder, alreadyExist,
        update, add, fileHandlers, format, updateListPrice)
      // Then
      expect(order).toEqual('fake updated order')
    })
  })
  describe('when orderData is not valid', () => {
    it('throws InvalidOrderFormatError', () => {
      const orderId = 1
      const orderData = 'fake data'
      const alreadyExist = jest.fn(() => false)
      const update = jest.fn()
      const add = jest.fn()
      const fileHandlers = { orders: {
        read: jest.fn(() => {
          return {orders: [{}]}
        })
      }}
      const format = jest.fn()
      const updateListPrice = jest.fn()
      const isValidOrder = jest.fn(() => false)
      expect(() => {
        updateOrCreate(orderId, orderData, isValidOrder, alreadyExist, update, add,
          fileHandlers, format, updateListPrice)
      }).toThrow(updateOrCreate.InvalidOrderFormatError)
    })
  })
})
