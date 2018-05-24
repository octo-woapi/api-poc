const fileHandlers = {orders: {read: jest.fn(() => []),
  write: jest.fn()}}
const updateTotalsList = jest.fn((orders) => orders)
const alreadyExist = jest.fn(() => false)
const DEFAULT_ORDER = {id: 0, productsList: [], status: 'pending'}

const {add} = require('../../../orders/usecase/add')(fileHandlers.orders, alreadyExist, updateTotalsList)

describe(':add(orderId, orderData, orders)', () => {
  describe('when there is no id or data precise', () => {
    it('adds a default order', async () => {
      const orders = await add()
      expect(orders).toEqual([DEFAULT_ORDER])
    })
  })
  describe('when only id is precise', () => {
    it('adds a default order with the specific id', async () => {
      const orders = await add(1)
      DEFAULT_ORDER.id = 1
      expect(orders).toEqual([DEFAULT_ORDER])
    })
  })
  describe('when id is precise but equal to 0', () => {
    it('adds a default order with the specific id', async () => {
      const orders = await add(0)
      DEFAULT_ORDER.id = 0
      expect(orders).toEqual([DEFAULT_ORDER])
    })
  })
  describe('when only data is precise', () => {
    it('adds a default order with the specific id', async () => {
      const ORDER = { id: 0, productsList: [{product:{name: 'banana', price:2, weight: 1.5}, quantity: 100}],
        status: 'pending'}
      const orders = await add(null, ORDER)
      expect(orders).toEqual([ORDER])
    })
  })
  describe('When id and data is precise', () => {
    it('adds the specific order', async () => {
      const id = 3
      const ORDER = { id: 3, productsList: [{product:{name: 'banana', price:2, weight: 1.5}, quantity: 100}],
        status: 'pending'}
      const orders = await add(id, ORDER)
      expect(orders).toEqual([ORDER])
    })
  })
})
