const request = require('request')
const server = require('../server.js')
const products = require('../routes/products.js')
const tools = require('../tools.js')

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
  test('Retrieve the first product', (done) => {
    request.get(`http://localhost:${PORT}/products/0`, (err) => {
      if (err) throw err
      expect(products.getProduct(0)).toEqual({'id': 0, 'name': 'banana', 'price': 2, 'weight': 0.2})
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
  test('Sorting is working', (done) => {
    const toBeSortedJSON = products.getProducts()
    const sortedJSONByPrice = { 'products': [{'id': 1, 'name': 'orange', 'price': 1.5, 'weight': 0.3}, {'id': 0, 'name': 'banana', 'price': 2, 'weight': 0.2}]}
    expect(sortedJSONByPrice).toBe(products.sortBy(toBeSortedJSON, 'price'))
  })
})

describe('POST /products', () => {
  /* test('Add data received in the JSON products', (done) => {
    const lengthBefore = products.productsLength
    products.addProduct('vanilla', 10, 0.01, (err, msg) => {
      if (err) throw err
      expect(products.productsLength).toBe(lengthBefore + 1)
    })
  }) */
  test('Data received well added in the JSON', (done) => {
    request.post({url: `http://localhost:${PORT}/products`, form: {'name': 'vanilla', 'price': 10, 'weight': 0.01}}, (err) => {
      if (err) throw err
      expect(products.getProducts()[products.productsLength]).toEqual({'id': products.getProducts()[products.productsLength].id, 'name': 'vanilla', 'price': 10, 'weight': 0.01})
      done()
    })
  })
})

/* describe('Catch missing arguments POST data', () => {
  test('Catch missing arguments name in POST data', (done) => {
    const testForm = {'price': 10, 'weight': 0.01}
    request.post({url: `http://localhost:${PORT}/products`, form: testForm}, (err) => {
      console.log(err)
      expect(products.addProduct(err)).toThrow(new Error('Name of the product is undefined'))
      done()
    })
  })
}) */

describe('Check that error handling works correctly', () => {
  test('Check that error handling works correctly', () => {
    expect(tools.connerieThrowException).toThrow(new Error('test Exception'))
  })
})
