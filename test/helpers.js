const fileHandler = require('../server/tools/fileHandler')
const server = require('../server/server')

const env = process.env.NODE_ENV || 'development'
const conf = require('../server/conf')[env]

const fileHandlers = {
  products: fileHandler(conf.data.products),
  orders: fileHandler(conf.data.orders),
  bills: fileHandler(conf.data.bills)
}

const addBill = require('../bills/usecase/add')(fileHandlers.bills).add
const deleteAllBills = require('../server/tools/deleteAll')(fileHandlers.bills).deleteAll
const addOrder = require('../orders/usecase/add')(fileHandlers.orders).add
const deleteAllOrders = require('../server/tools/deleteAll')(fileHandlers.orders).deleteAll
const addProduct = require('../products/usecase/add')(fileHandlers.products).add
const deleteAllProducts = require('../server/tools/deleteAll')(fileHandlers.products).deleteAll

const startApi = (PORT) => {
  beforeAll((done) => {
    server.listen(PORT, done)
  })

  afterAll(() => {
    server.close()
  })
}

module.exports = {
  startApi,
  deleteAllProducts,
  addProduct,
  deleteAllOrders,
  addOrder,
  deleteAllBills,
  addBill
}
