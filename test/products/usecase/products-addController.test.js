const {addController, InvalidProductFormatError} = require('../../products/usecase/addController')

describe('addController(:inputs, getList, isValidProduct, format, add', () => {
  describe('when product inputs is invalid', () => {
    it('throws InvalidProductFormatError', () => {
      const data = {}
      const getList = []
      const isValidProduct = jest.fn(() => false)
      const format = jest.fn()
      const add = jest.fn()
      expect(() => {
        addController(data, getList, isValidProduct, format, add)
      }).toThrow(InvalidProductFormatError)
    })
  })
  describe('when everything is fine', () => {
    it('calls format with inputs', () => {
      const format = jest.fn()
      const getList = []
      const data = {}
      const isValidProduct = jest.fn(() => true)
      const add = jest.fn()
      const inputs = {}
      addController(data, getList, isValidProduct, format, add)
      expect(format).toBeCalledWith(inputs)
    })
    it('calls add with a new id and the inputs', () => {
      const getList = []
      const id = 0
      const inputs = {}
      const isValidProduct = jest.fn(() => true)
      const format = jest.fn((data) => data)
      const add = jest.fn()
      addController(inputs, getList, isValidProduct, format, add)
      expect(add).toBeCalledWith(id, inputs)
    })
  })
})
