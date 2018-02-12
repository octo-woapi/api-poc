const request = require('request')
const server = require('../server.js')

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
