const request = require('request')
const server = require('../../server/server.js')
const getData = require('../../products/get.js')

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
  test('getData.getProduct(:id) retrieve the good product', () => {
    expect(getData.getProduct(0)).toEqual({'id': 0, 'name': 'banana', 'price': 2, 'weight': 0.2})
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
  /* test('getParams is getting all the params', (done) => {
    request.get(`http://localhost:${PORT}/products?sort=price`, (err, res) => {
      if (err) throw err
      expect(res.query).toBe('{sort:"price"}')
      done()
    })
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
