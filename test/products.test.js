const request = require('request')
const server = require('../server.js')
const tools = require('../tools.js')

const PORT = 3002

beforeAll(() => {
  server.listen(PORT)
})

afterAll(() => {
  server.close()
})

describe('GET /products', () => {
  test('Return 200 when everything is fine', (done) => {
    request(`http://localhost:${PORT}/products`, (err, res) => {
      if (err) throw err
      expect(res.statusCode).toBe(200)
      done()
    })
  })
})

describe('POST /products', () => {
  test('Add data received in the JSON products', (done) => {
    request.post({url: `http://localhost:${PORT}/products`, form: {'name': 'vanilla', 'price': 10, 'weight': 0.01}}, (err) => {
      if (err) throw err
      expect(tools.getProducts()[tools.productsLength]).toEqual({'id': tools.productsLength + 1, 'name': 'vanilla', 'price': 10, 'weight': 0.01})
      done()
    })
  })
})

describe('Catch missing arguments POST data', () => {
  test('Catch missing arguments name in POST data', (done) => {
    let testForm = {'price': 10, 'weight': 0.01};
    request.post({url: `http://localhost:${PORT}/products`, form: testForm}, (err) => {
      expect(tools.addProduct(testForm)).toThrow('Name of the product is undefined')
    })
  })
})

describe('Check that error handling works correctly', () => {
  test('Check that error handling works correctly', () => {
    expect(tools.connerieThrowException).toThrow(new Error('test Exception'))
  })
})
