const fileHandler = require('../server/tools/fileHandler')
const server = require('../server/server')

const env = process.env.NODE_ENV || 'development'
const conf = require('../server/conf')[env]

const fileHandlers = {
  products: fileHandler(conf.data.products), orders: fileHandler(conf.data.orders), bills: fileHandler(conf.data.bills)
}
const getProductById = require('../products/usecase/getById')(fileHandlers.products).getById
const getOrderById = require('../orders/usecase/getById')(fileHandlers.orders).getById
const createBill = require('../bills/usecase/add')(fileHandlers.bills, getOrderById).add
const {deleteBill} = require('../bills/usecase/deleteBill')(fileHandlers.bills)
const {validateProduct} = require('../products/validator/validateProduct')
const alreadyExist = require('../server/validator/alreadyExist')
const {updateTotals} = require('../orders/domain/updateTotals')(getProductById)
const {updateTotalsList} = require('../orders/domain/updateTotalsList')(updateTotals)

const deleteAllBills = require('../server/tools/deleteAll')(fileHandlers.bills).deleteAll
const addOrder = require('../orders/usecase/add')(fileHandlers.orders, alreadyExist, updateTotalsList).add
const deleteAllOrders = require('../server/tools/deleteAll')(fileHandlers.orders).deleteAll
const addProduct = require('../products/usecase/add')(fileHandlers.products, validateProduct, alreadyExist).add
const deleteAllProducts = require('../server/tools/deleteAll')(fileHandlers.products).deleteAll
const updateOrder = require('../orders/usecase/update')(fileHandlers.orders, updateTotalsList, createBill, deleteBill).update

const startApi = PORT => {
  beforeAll(done => {
    server.listen(PORT, done)
  })

  afterAll(() => {
    server.close()
  })
}

module.exports = {
  startApi, deleteAllProducts, addProduct, deleteAllOrders, addOrder, updateOrder, deleteAllBills
}
