const {startApi, deleteAllBills, addBill} = require('../helpers')
const request = require('request')
const fs = require('fs')
const path = '/Users/romaincalamier/api-poc/bills/data/test.json'

const PORT = 3002

startApi(PORT)

describe('router(:req, res, id)', () => {
  beforeEach(async () => {
    const orderId = 0; const amount = 1222
    await deleteAllBills()
    await addBill(orderId, amount)
  })
  describe('GET /bills', () => {
    describe('when id is not defined', () => {
      it('returns 200', (done) => {
        request({url: `http://localhost:${PORT}/bills`, method: 'GET'}, (err, res) => {
          if (err) console.log(err)
          expect(res.statusCode).toBe(200)
          done()
        })
      })
      it('returns bills list', (done) => {
        request(`http://localhost:${PORT}/bills`, (err, res) => {
          if (err) console.log(err)
          expect(JSON.parse(res.body).amount).toEqual(JSON.parse(fs.readFileSync(path, 'utf-8')).amount)
          done()
        })
      })
    })
    describe('when id is defined', () => {
      describe('when the bill does not exist', () => {
        it('returns 403', (done) => {
          request(`http://localhost:${PORT}/bills/3`, (err, res) => {
            if (err) console.log(err)
            expect(JSON.parse(res.statusCode)).toBe(403)
            done()
          })
        })
      })
      describe('when the bill exist', () => {
        it('returns 200', (done) => {
          request(`http://localhost:${PORT}/bills/0`, (err, res) => {
            if (err) console.log(err)
            expect(JSON.parse(res.statusCode)).toBe(200)
            done()
          })
        })
      })
    })
  })
  describe('DELETE /bills', () => {
    describe('when id is not given', () => {
      it('returns 204', (done) => {
        request({url: `http://localhost:${PORT}/bills`, method: 'DELETE'}, (err, res) => {
          if (err) console.log(err)
          expect(JSON.parse(res.statusCode)).toBe(204)
          done()
        })
      })
    })
    describe('when id is given', () => {
      describe('when id does not exist in the list', () => {
        it('returns 403', (done) => {
          request({url: `http://localhost:${PORT}/bills/1`, method: 'DELETE'}, (err, res) => {
            if (err) console.log(err)
            expect(JSON.parse(res.statusCode)).toBe(403)
            done()
          })
        })
      })
      describe('when id exist in the list', () => {
        it('returns 204', (done) => {
          request({url: `http://localhost:${PORT}/bills/0`, method: 'DELETE'}, (err, res) => {
            if (err) console.log(err)
            expect(JSON.parse(res.statusCode)).toBe(204)
            done()
          })
        })
      })
    })
  })
})
