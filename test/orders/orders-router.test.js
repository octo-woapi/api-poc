const router = require('../../orders/router')
const validator = require('../../orders/validator/alreadyExist')
const update = require('../../orders/usecase/update')
const add = require('../../orders/usecase/add')
const getList = require('../../orders/usecase/getList')

describe('router(:req, :res)', () => {
  describe('When request method is PUT', () => {
    it('calls updateAndCreate.js with request body', () => {
      // Given
      const req = {method: 'PUT', body: {status: 'pending'}}
      const res = {}
      let updateOrCreate = jest.fn()
      // When
      router(req, res, updateOrCreate)
      // Then
      expect(updateOrCreate).toBeCalled()
    })
    let updateOrCreate = require('../../orders/usecase/updateAndCreate')
    it('returns orders updated when id already exist', () => {
      const orderId = 1
      const orderData = 'fake data'
      const orders = [{id: orderId, value: orderData}]
      const fileHandler = {
        read: jest.fn(() => { return JSON.stringify({orders: [{id: orderId, value: ''}]}) }),
        write: jest.fn()
      }
      expect(orders).toEqual(updateOrCreate(orderId, orderData, validator.alreadyExist, update,
        add, fileHandler))
    })
    it('returns orders updated when id does not exist', () => {
      const orderId = 1
      const orderData = 'fake data'
      const orders = [{id: orderId, value: orderData}]
      const fileHandler = {
        read: jest.fn(() => { return JSON.stringify({orders: []}) }),
        write: jest.fn()
      }
      expect(orders).toEqual(updateOrCreate(orderId, orderData, validator.alreadyExist, update,
        add, fileHandler))
    })
  })
  describe('When request method is GET', () => { //seems to be wrong
    it('returns orders when id is not defined', () => {
      const fileHandler = { read: jest.fn(() => { return JSON.stringify({orders: []}) }) }
      expect(getList(fileHandler)).toEqual([])
    })
  })
})
