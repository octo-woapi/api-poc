const {isQueryParams, InvalidParameter} = require('../../../server/validator/isQueryParams')

describe('isQueryParams(:params)', () => {
  describe('params define sort with one parameter', () => {
    it('returns true', () => {
      const params = {sort: 'price'}
      expect(isQueryParams(params)).toBe(true)
    })
  })
  describe('if params.sort is define but with incorrect value', () => {
    it('returns invalid parameter', () => {
      const params = {sort: 'fake'}
      expect(() => {
        isQueryParams(params)
      }).toThrow(InvalidParameter)
    })
  })
  describe('when params.sort is undefined', () => {
    it('returns false', () => {
      const params = {}
      expect(isQueryParams(params)).toBe(false)
    })
  })
})
