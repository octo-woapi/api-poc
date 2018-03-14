const {updateOrCreate, InvalidOrderFormatError} = require('../../../orders/usecase/updateAndCreate')

describe('updateOrCreate(:orderId, :orderData, :alreadyExist, :update, :add, ' +
  ':filHandlers, :format, :updatePriceList)', () => {
  describe('when everything is fine', () => {
    it('calls format with orderData', () => {
      const orderId = 1
      const orderData = '{}'
      const isValidOrder = jest.fn(() => { return true })
      const alreadyExist = jest.fn()
      const update = jest.fn()
      const add = jest.fn()
      const format = jest.fn()
      const getProductById = jest.fn()
      const updatePriceList = jest.fn()
      updateOrCreate(orderId, orderData, isValidOrder, alreadyExist, update, add,
        format, updatePriceList, getProductById)
      expect(format).toBeCalledWith(orderData)
    })
    it('calls updatePriceList with updated orders', () => {
      const orderId = 1
      const orderData = '{}'
      const orderDataUpdated = 'updated fake data'
      const isValidOrder = jest.fn(() => true)
      const alreadyExist = jest.fn(() => true)
      const update = jest.fn(() => orderDataUpdated)
      const add = jest.fn()
      const getProductById = jest.fn()
      const format = jest.fn(() => orderData)
      const updatePriceList = jest.fn()
      updateOrCreate(orderId, orderData, isValidOrder, alreadyExist, update, add,
        format, updatePriceList, getProductById)
      expect(updatePriceList).toBeCalledWith(orderDataUpdated, getProductById)
    })
  })
  describe('When id already exists', () => {
    it('calls alreadyExists with orderId and orders', () => {
      const orderId = 1
      const orderData = '{}'
      const alreadyExist = jest.fn()
      const getProductById = jest.fn()
      const update = jest.fn()
      const add = jest.fn()
      const format = jest.fn()
      const updatePriceList = jest.fn()
      const isValidOrder = jest.fn(() => true)
      // When
      updateOrCreate(orderId, orderData, isValidOrder, alreadyExist, update, add,
        format, updatePriceList, getProductById)
      // Then
      expect(alreadyExist).toBeCalledWith(orderId)
    })
    it('calls update with orderId, orderData and fileHandlers', () => {
      const orderId = 1
      const orderData = '{}'
      const alreadyExist = jest.fn(() => true)
      const update = jest.fn()
      const add = jest.fn()
      const getProductById = jest.fn()
      const format = jest.fn(() => orderData)
      const updatePriceList = jest.fn()
      const isValidOrder = jest.fn(() => true)
      // When
      updateOrCreate(orderId, orderData, isValidOrder, alreadyExist, update, add,
        format, updatePriceList, getProductById)
      // Then
      expect(update).toBeCalledWith(orderId, orderData)
    })
    it('returns what update returns', () => {
      const orderId = 1
      const orderData = '{}'
      const orderDataUpdated = 'fake updated order'
      const alreadyExist = jest.fn(() => true)
      const update = jest.fn(() => [orderDataUpdated])
      const add = jest.fn()
      const getProductById = jest.fn()
      const format = jest.fn(() => orderData)
      const updatePriceList = jest.fn(() => [orderDataUpdated])
      const isValidOrder = jest.fn(() => true)
      // When
      const orders = updateOrCreate(orderId, orderData, isValidOrder, alreadyExist,
        update, add, format, updatePriceList, getProductById)
      // Then
      expect(orders).toEqual([orderDataUpdated])
    })
  })
  describe('when id does not exist', () => {
    it('calls add with orderId, orderData and fileHandlers', () => {
      const orderId = 1
      const orderData = '{}'
      const alreadyExist = jest.fn(() => false)
      const add = jest.fn()
      const update = jest.fn()
      const getProductById = jest.fn()
      const format = jest.fn(() => orderData)
      const updatePriceList = jest.fn()
      const isValidOrder = jest.fn(() => true)
      // When
      updateOrCreate(orderId, orderData, isValidOrder, alreadyExist, update,
        add, format, updatePriceList, getProductById)
      // Then
      expect(add).toBeCalledWith(orderId, orderData)
    })
    it('returns what add returns', () => {
      const orderId = 1
      const orderData = '{}'
      const alreadyExist = jest.fn(() => false)
      const update = jest.fn()
      const add = jest.fn(() => 'fake updated order')
      const getProductById = jest.fn()
      const format = jest.fn(() => orderData)
      const updatePriceList = jest.fn(() => 'fake updated order')
      const isValidOrder = jest.fn(() => true)
      // When
      const order = updateOrCreate(orderId, orderData, isValidOrder, alreadyExist,
        update, add, format, updatePriceList, getProductById)
      // Then
      expect(order).toEqual('fake updated order')
    })
  })
  describe('when orderData is not valid', () => {
    it('throws InvalidOrderFormatError', () => {
      const orderId = 1
      const orderData = '{}'
      const alreadyExist = jest.fn(() => false)
      const update = jest.fn()
      const add = jest.fn()
      const getProductById = jest.fn()
      const format = jest.fn()
      const updatePriceList = jest.fn()
      const isValidOrder = jest.fn(() => false)
      expect(() => {
        updateOrCreate(orderId, orderData, isValidOrder, alreadyExist, update, add,
          format, updatePriceList, getProductById)
      }).toThrow(InvalidOrderFormatError)
    })
  })
})
