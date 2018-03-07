const request = require('request')
const server = require('../../server/server.js')

const PORT = 3002

beforeAll((done) => {
  server.listen(PORT, done)
})

afterAll(() => {
  server.close()
})

describe('PUT /orders', () => {
  describe('When the order exists', () => {
    it('returns 200', (done) => {
      request.put(`http://localhost:${PORT}/orders/1`, (err, res) => {
        if (err) throw err
        expect(res.statusCode).toBe(200)
        done()
      })
    })

    it('returns the new resource representation', (done) => {
      request({
        method: 'PUT',
        url: `http://localhost:${PORT}/orders/1`,
        json: {}
      }, (err, res, body) => {
        if (err) throw err
        expect(body).toEqual({})
        done()
      })
    })
  })
})