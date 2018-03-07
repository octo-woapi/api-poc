const validator = require('../../products/validator')

describe('.isNameDefined(:inputs)', () => {
  describe('When inputs.name is undefined', () => {
    test('throws an exception', () => {
      // Given
      const data = {}

      // When
      expect(() => {
        validator.isNameDefined(data)
      }).toThrow(validator.InvalidNameError)
    })
  })
})

describe('.formatInputs', () => {
  describe('When price is undefined', () => {
    test('return price equal to 0', () => {
      const data = {}
      expect(validator.formatInputs(data)).toEqual({'price': 0, 'weight': 0})
    })
  })
  describe('When price is defined', () => {
    test('return price equal to 0', () => {
      const data = {'price': 22.3}
      expect(validator.formatInputs(data)).toEqual({'price': 22.3, 'weight': 0})
    })
  })
})

describe('.isQueryParams(:params)', () => {
  describe('When params is undefined', () => {
    test('return false', () => {
      const params = undefined
      expect(validator.isQueryParams(params)).toBe(false)
    })
  })
  describe('When params is null', () => {
    test('return false', () => {
      const params = null
      expect(validator.isQueryParams(params)).toBe(false)
    })
  })
  describe('When params is correct', () => {
    test('return true', () => {
      const params = '?sort=-price,name'
      expect(validator.isQueryParams(params)).toBe(true)
    })
  })
})

describe('.isValidId(:id)', () => {
  describe('When id is undefined', () => {
    test('return false', () => {
      const id = undefined
      expect(validator.isValidId(id)).toBe(false)
    })
  })
  describe('When id is correct', () => {
    test('return true', () => {
      const id = 1
      expect(validator.isValidId(id)).toBe(true)
    })
  })
})