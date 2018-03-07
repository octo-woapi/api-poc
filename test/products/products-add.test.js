const addData = require('../../products/addData')
const validator = require('../../products/validator')
const getData = require('../../products/get')

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
      const lastIdBefore = getData.getProducts()[0].id
      addData.addProduct(data, () => {
        expect(getData.getProducts()[0].id).toEqual(lastIdBefore)
        done()
      })
    })
  })
  /* describe('When everything fine', () => {
    test.only('Product added is the last product in the list', () => {
      const data = {'name': 'vanilla', 'price': 10, 'weight': 0.01}
      const lengthBefore = getData.getProducts().length
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
