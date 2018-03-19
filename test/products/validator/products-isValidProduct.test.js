const {isValidProduct, InvalidNameError} = require('../../../products/validator/isValidProduct')

describe('.isNameDefined(:inputs)', () => {
  describe('When inputs.name is undefined', () => {
    test('throws an exception', () => {
      // Given
      const data = {}

      // When
      expect(() => {
        isValidProduct(data)
      }).toThrow(InvalidNameError)
    })
  })
})
