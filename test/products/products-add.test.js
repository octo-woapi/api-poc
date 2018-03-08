const addData = require('../../products/addData')
const validator = require('../../products/validator')
const get = require('../../products/get')

describe('.addProduct(:inputs)', () => {
  describe('When name is undefined', () => {
    test('throws an exception', (done) => {
      const data = {}
      addData.addProduct(data, (err) => {
        expect(err).toEqual(new validator.InvalidNameError('Name of the product is undefined'))
        done()
      })
    })
    test('I don‘t add something in data-development.json', (done) => {
      const data = {}
      const fileHandlers = {products: {read: jest.fn(() => {
        return {products: [
          {'id': 1, 'name': 'orange', 'price': 1.5, 'weight': 0.3},
          {'id': 0, 'name': 'banana', 'price': 2, 'weight': 0.2},
          {'id': 2, 'name': 'vanilla', 'price': 10, 'weight': 0.01}]
        }
      })}}
      const lastIdBefore = get.getList(fileHandlers)[0].id
      addData.addProduct(data, () => {
        expect(get.getList(fileHandlers)[0].id).toEqual(lastIdBefore)
        done()
      })
    })
  })
  /* describe('When everything fine', () => {
    test.only('Product added is the last product in the list', () => {
      const data = {'name': 'vanilla', 'price': 10, 'weight': 0.01}
      const lengthBefore = getData.getList(fileHandlers).length
      console.log(lengthBefore)
      const fileHanlderMock = {
        write (path, data, callback) {
          callback()
          console.log(JSON.parse(data))
          expect(JSON.parse(data)[JSON.parse(data).length - 1]).toEqual({
            products: [
              {id: 1, name: 'vanilla', price: 10, weight: 0.01}
            ]
          })
        }
      }
      addData.addProduct(data, (err, products) => {
        expect(products.length).toBe(lengthBefore + 1)
      }, fileHanlderMock)
    })
  }) */
})
