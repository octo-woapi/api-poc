const request = require('request')
const server = require('../server/server.js')
const printer = require('../products/getData.js')

const PORT = 3002

beforeAll(() => {
  server.listen(PORT)
})

afterAll(() => {
  server.close()
})

describe('GET /', () => {
  test('Return 200 when everything is fine', (done) => {
    request(`http://localhost:${PORT}`, (err, res) => {
      if (err) throw err
      expect(res.statusCode).toBe(200)
      done()
    })
  })
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

describe('GET /products/0', () => {
  test('Return 200 when everything is fine', (done) => {
    request.get(`http://localhost:${PORT}/products/0`, (err, res) => {
      if (err) throw err
      expect(res.statusCode).toBe(200)
      done()
    })
  })
  test('printer.getProduct(:id) retrieve the good product', () => {
    expect(printer.getProduct(0)).toEqual({'id': 0, 'name': 'banana', 'price': 2, 'weight': 0.2})
  })
  test('Retrieve the first product', (done) => {
    request.get(`http://localhost:${PORT}/products/0`, (err, res, body) => {
      if (err) throw err
      expect(JSON.parse(body)).toEqual({'id': 0, 'name': 'banana', 'price': 2, 'weight': 0.2})
      done()
    })
  })
})

describe('GET /products?sort=name', () => {
  test('Return 200 when everything is fine', (done) => {
    request.get(`http://localhost:${PORT}/products?sort=price,name&desc=price`, (err, res) => {
      if (err) throw err
      expect(res.statusCode).toBe(200)
      done()
    })
  })
  /* test('Sorting is working', (done) => {
    const toBeSortedJSON = products.getProducts()
    const sortedJSONByPrice = { 'products': [{'id': 1, 'name': 'orange', 'price': 1.5, 'weight': 0.3}, {'id': 0, 'name': 'banana', 'price': 2, 'weight': 0.2}]}
    expect(sortedJSONByPrice).toBe(products.sortBy(toBeSortedJSON, 'price'))
  }) */
})
/*  describe('Catch missing arguments POST data', () => {
    test('When name is undefined', (done) => {
      const testForm = {'price': 10, 'weight': 0.01}
      request.post({url: `http://localhost:${PORT}/products`, form: testForm}, (err, res) => {
        if (err) throw err
        expect(res.statusCode).toEqual(400)
        done()
      })
    })
  })
}) */
