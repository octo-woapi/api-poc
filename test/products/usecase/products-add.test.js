const addModule = require('../../../products/usecase/add')

describe('.add(:fileHandler, :id, :inputs)', () => {
  describe('When everything is fine', () => {
    it('return updated list', () => {
      const beforeAdd = {products: []}
      const inputs = {id: 'fake'}
      const fileHandlers = {
        products: {
          read: jest.fn(() => beforeAdd),
          write: jest.fn()
        }
      }
      const {add} = addModule(fileHandlers.products)
      const json = {id: 0, name: undefined, price: undefined, weight: undefined}
      const id = 0
      const afterAdd = add(id, inputs)
      expect(afterAdd).toEqual({products: [json]})
    })
    it('calls write', () => {
      const id = 0
      const inputs = {}
      const fileHandlers = {
        products: {
          read: jest.fn(() => { return { products: [] } }),
          write: jest.fn()
        }
      }
      const {add} = addModule(fileHandlers.products)
      add(id, inputs)
      expect(fileHandlers.products.write).toBeCalled()
    })
  })
})
