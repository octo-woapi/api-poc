const router = require('../orders/router')

describe('main(:req, :res)', () => {
  describe('When request method is PUT', () => {
    it('calls updateOrCreate.js with request body', () => {
      // Given
      const req = {method: 'PUT', body: {status: 'pending'}}
      const services = { updateOrCreate: jest.fn() }
      // When
      router.main(req, services)
      // Then
      expect(services.updateOrCreate).toBeCalledWith({status: 'pending'})
    })
  })
})
