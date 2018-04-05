const request = require('request')
const {startApi, deleteAllProducts, addProduct} = require('../helpers')
const fs = require('fs')

const PORT = 3002

startApi(PORT)

describe('Products', () => {
  beforeEach(async () => {
    await deleteAllProducts()
    await addProduct(0, {name: 'banana', price: 2, weight: 0.2})
    await addProduct(1, {name: 'orange', price: 1.5, weight: 0.3})
    await addProduct(2, {name: 'vanilla', price: 10, weight: 0.01})
  })
  describe('GET /products', () => {
    describe('when everything is fine', () => {
      it('returns 200 when everything is fine', (done) => {
        request({url: `http://localhost:${PORT}/products`}, (err, res) => {
          if (err) throw err
          expect(res.statusCode).toBe(200)
          done()
        })
      })
      it('return products list', (done) => {
        request({url: `http://localhost:${PORT}/products`}, (err, res) => {
          if (err) throw err
          expect(JSON.parse(res.body)).toEqual(JSON.parse(fs.readFileSync('/Users/romaincalamier' +
            '/api-poc/products/data/test.json', 'utf-8')))
          done()
        })
      })
    })
    describe('when id is precise but not existing', () => {
      it('returns 404', (done) => {
        request({url: `http://localhost:${PORT}/products/5`}, (err, res) => {
          if (err) throw err
          expect(res.statusCode).toBe(404)
          done()
        })
      })
    })
    describe('when sort is called properly', () => {
      it('returns 200', (done) => {
        request({url: `http://localhost:${PORT}/products?sort=weight`}, (err, res) => {
          if (err) throw err
          expect(res.statusCode).toBe(200)
          done()
        })
      })
      it('returns products sorted', (done) => {
        request({url: `http://localhost:${PORT}/products?sort=weight`}, (err, res) => {
          if (err) throw err
          const sortedByWeightProductsList = [{'id': 2, 'name': 'vanilla', 'price': 10, 'weight': 0.01}]
          expect(JSON.parse(res.body)[0]).toEqual(sortedByWeightProductsList[0])
          done()
        })
      })
    })
    describe('when sort is called with an invalid parameter', () => {
      it('returns 400', (done) => {
        const invalidParameter = 'kake'
        request({url: `http://localhost:${PORT}/products?sort=` + invalidParameter}, (err, res) => {
          if (err) throw err
          expect(res.statusCode).toBe(400)
          done()
        })
      })
    })
  })

  describe('POST /products', () => {
    describe('when the format of the productData is invalid', () => {
      it('returns 400', (done) => {
        request({url: `http://localhost:${PORT}/products`, method: 'POST', json: {data: 'fake data'}}, (err, res) => {
          if (err) console.log(err)
          expect(res.statusCode).toBe(400)
          done()
        })
      })
    })
    describe('when everything is fine', () => {
      it('adds the products in the list', (done) => {
        const json = {id: 3, name: 'kiwi', price: 3, weight: 0.2}
        request({
          url: `http://localhost:${PORT}/products`,
          method: 'POST',
          json: json
        }, (err, res) => {
          if (err) console.log(err)
          expect(JSON.parse(fs.readFileSync('/Users/romaincalamier' +
            '/api-poc/products/data/test.json', 'utf-8')).slice(-1)[0]).toEqual(json)
          done()
        })
      })
    })
  })
})

