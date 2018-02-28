const updateOrCreate = require('../orders/updateAndCreate')

describe('updateOrCreate(:orderId, :orderData', () => {
  describe('When id already exists', () => {
    it('calls alreadyExists with orderId and fileHandler', () => {
      const orderId = 1
      const alreadyExist = jest.fn(() => true)
      const fileHandler = jest.fn()
      const update = () => {
      }
      // When
      updateOrCreate.main(orderId, {}, alreadyExist, update, fileHandler)
      // Then
      expect(alreadyExist).toBeCalledWith(orderId)
    })
    it('calls update with orderId and orderData and fileHandler', () => {
      const orderId = 1
      const orderData = 'fake data'
      const alreadyExist = jest.fn(() => true)
      const update = jest.fn()
      const fileHandler = jest.fn()
      // When
      updateOrCreate.main(orderId, orderData, alreadyExist, update, fileHandler)
      // Then
      expect(update).toBeCalledWith(orderId, orderData, fileHandler)
    })
    it('returns what update returns', () => {
      const orderId = 1
      const orderData = 'fake data'
      const alreadyExist = jest.fn(() => true)
      const update = jest.fn(() => 'fake updated order')
      const fileHandler = jest.fn()
      // When
      const order = updateOrCreate.main(orderId, orderData, alreadyExist, update, fileHandler)
      // Then
      expect(order).toEqual('fake updated order')
    })
  })
})

