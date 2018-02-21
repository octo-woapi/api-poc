const validator = require('../products/validator')

describe('.validateInputs(:inputs)', () => {
  describe('When input.name is undefined', () => {
    test('throws an exception', () => {
      // Given
      const data = {}

      // When
      expect(() => {
        validator.validateInputs(data)
      }).toThrow(validator.InvalidNameError)
    })
  })
})

describe('.validateParams(:params)', () => {
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