const request = require('request')
const server = require('../../server/server.js')

const PORT = 3002

beforeAll((done) => {
  server.listen(PORT, done)
})

afterAll(() => {
  server.close()
})

describe('PUT /orders/1', () => {
  describe('When the order id is not precise', () => {
    it('returns 400', (done) => {
      request({url: `http://localhost:${PORT}/orders`, method: 'PUT', json: {id: 1, productsList: []}}, (err, res) => {
        if (err) console.log(err)
        expect(res.statusCode).toBe(400)
        done()
      })
    })
    it('returns an invalid id error', (done) => {
      request({url: `http://localhost:${PORT}/orders`, method: 'PUT', json: {id: 1, productsList: []}}, (err, res) => {
        if (err) console.log(err)
        expect(res.body).toBe('ID undefined can not PUT data')
        done()
      })
    })
  })
  describe('When the sent order does not respect the expected format', () => {
    it('returns 400', (done) => {
      request({url: `http://localhost:${PORT}/orders/1`, method: 'PUT', json: {data: 'fake data'}}, (err, res) => {
        if (err) console.log(err)
        expect(res.statusCode).toBe(400)
        done()
      })
    })
    it('returns an invalid format error', (done) => {
      request({url: `http://localhost:${PORT}/orders/1`, method: 'PUT', json: {data: 'fake data'}}, (err, res) => {
        if (err) console.log(err)
        expect(res.body).toBe('Invalid format Error: id and products must be defined ' +
          'and status can only be pending, paid or cancel')
        done()
      })
    })
  })
  describe('When the order exists', () => {
    it('returns 200', (done) => {
      request({
        url: `http://localhost:${PORT}/orders/1`,
        method: 'PUT',
        json: {id: 1, productsList: []}
      }, (err, res) => {
        if (err) console.log(err)
        expect(res.statusCode).toBe(200)
        done()
      })
    })
  })
})

const fs = require('fs')

describe('POST /orders', () => {
  describe('when the format of the orderData is invalid', () => {
    it('returns 400', (done) => {
      request({url: `http://localhost:${PORT}/orders/1`, method: 'POST', json: {data: 'fake data'}}, (err, res) => {
        if (err) console.log(err)
        expect(res.statusCode).toBe(400)
        done()
      })
    })
  })
  describe('when everything is fine', () => {
    it('returns 200', (done) => {
      request({
        url: `http://localhost:${PORT}/orders/1`,
        method: 'POST',
        json: {productsList: []}
      }, (err, res) => {
        if (err) console.log(err)
        expect(res.statusCode).toBe(200)
        done()
      })
    })
    it('adds the product in the list', (done) => {
      request({
        url: `http://localhost:${PORT}/orders/1`,
        method: 'POST',
        json: {productsList: [{id: 1, name: 'fake data post'}]}
      }, (err, res) => {
        if (err) console.log(err)
        console.log(res.body.getList)
        expect(res.body.getList).toBe(JSON.stringify(fs.readFileSync('/Users/' +
          'romaincalamier/api-poc/orders/data/test.json', 'utf-8')).orders)
        fs.writeFile('/Users/romaincalamier/api-poc/orders/data/test.json',
          JSON.stringify({orders: [{id: 1, productsList: []}]}), (err) => {
            if (err) throw err
            console.log('data-test rewrite')
            done()
          })
      })
    })
  })
})

describe('GET /orders', () => {
  describe('when everything is fine', () => {
    it('returns orders', (done) => {
      request({url: `http://localhost:${PORT}/orders`}, (err, res) => {
        if (err) console.log(err)
        expect(res.body.getList).toBe(JSON.stringify(fs.readFileSync('/Users/' +
          'romaincalamier/api-poc/orders/data/test.json', 'utf-8')).orders)
        done()
      })
    })
  })
  describe('when an id is precise', () => {
    describe('if this id does not correspond to an existing order', () => {
      it('returns 403', (done) => {
        request({url: `http://localhost:${PORT}/orders/2`}, (err, res) => {
          if (err) console.log(err)
          expect(res.statusCode).toBe(403)
          done()
        })
      })
    })
    describe('if the id correspond to an existing order', () => {
      it('returns the order wanted', (done) => {
        request({url: `http://localhost:${PORT}/orders/1`}, (err, res) => {
          if (err) console.log(err)
          expect(JSON.parse(res.body)).toEqual(JSON.parse(fs.readFileSync('/Users/' +
            'romaincalamier/api-poc/orders/data/test.json', 'utf-8')).orders[0])
          done()
        })
      })
    })
  })
})

describe('DELETE /orders/1', () => {
  describe('when the order is deleted', () => {
    it('returns 200', (done) => {
      request({url: `http://localhost:${PORT}/orders/1`, method: 'DELETE'}, (err, res) => {
        if (err) console.log(err)
        expect(res.statusCode).toBe(200)
        done()
      })
    })
    it('deletes the order wanted', (done) => {
      request({url: `http://localhost:${PORT}/orders/1`, method: 'DELETE'}, (err, res) => {
        if (err) console.log(err)
        console.log()
        expect(JSON.parse(fs.readFileSync('/Users/' +
          'romaincalamier/api-poc/orders/data/test.json', 'utf-8')).orders).toEqual([])
        done()
        fs.writeFile('/Users/romaincalamier/api-poc/orders/data/test.json',
          JSON.stringify({orders: [{id: 1, productsList: []}]}), (err) => {
            if (err) throw err
            console.log('data-test rewrite')
          })
      })
    })
  })
})
