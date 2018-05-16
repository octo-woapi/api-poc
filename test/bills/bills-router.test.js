const {
  startApi, deleteAllBills, deleteAllOrders, addOrder, updateOrder
} = require('../helpers')
const request = require('request')
const fs = require('fs')
const path = '/Users/romaincalamier/api-poc/bills/data/test.json'

const PORT = 3002

startApi(PORT)

describe('router(:req, res, id)', () => {
  beforeEach(async () => {
    await deleteAllOrders()
    await deleteAllBills()
    await addOrder()
    await updateOrder(0, {productsList: [{product: {id: 1}, quantity: 100}], status: 'paid'})
  })
  describe('GET /bills', () => {
    describe('when id is not defined', () => {
      it('returns 200', done => {
        request({url: `http://localhost:${PORT}/bills`, method: 'GET'}, (err, res) => {
          if (err) console.log(err)
          expect(res.statusCode).toBe(200)
          done()
        })
      })
      it('returns bills list', done => {
        request(`http://localhost:${PORT}/bills`, (err, res) => {
          if (err) console.log(err)
          expect(JSON.parse(res.body).amount).toEqual(JSON.parse(fs.readFileSync(path, 'utf-8')).amount)
          done()
        })
      })
    })
    describe('when id is defined', () => {
      describe('when the bill does not exist', () => {
        it('returns 403', done => {
          request(`http://localhost:${PORT}/bills/3`, (err, res) => {
            if (err) console.log(err)
            expect(JSON.parse(res.statusCode)).toBe(403)
            done()
          })
        })
      })
      describe('when the bill exist', () => {
        it('returns 200', done => {
          request(`http://localhost:${PORT}/bills/0`, (err, res) => {
            if (err) console.log(err)
            expect(JSON.parse(res.statusCode)).toBe(200)
            done()
          })
        })
      })
    })
  })
})
