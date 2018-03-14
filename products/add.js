const printer = require('./get')
const validator = require('./validator')
const tools = require('../server/tools')
const fileHandler = require('../server/fileHandler')

const env = process.env.NODE_ENV || 'development'
const conf = require('../server/conf')[env]

function addData (req, callback) {
  getData(req, (err, data) => {
    if (err) callback(err)
    let inputs = tools.getParams(data.toString('utf8'))
    addProduct(inputs)
  })
}

function getData (req, callback) {
  let data = ''
  req.on('error', (err) => {
    callback(err)
  })
  req.on('data', (chunk) => {
    data += chunk
  })
  req.on('end', () => {
    callback(null, data)
  })
}

function addProduct (json, callback) {
  // try catch
  try {
    validator.isNameDefined(json)
    const jsonFormatted = validator.formatInputs(json)
    const productsList = printer.getList(fileHandler)
    const lastId = productsList[productsList.length - 1].id
    const newId = lastId + 1
    productsList.push({
      'id': newId,
      'name': jsonFormatted.name,
      'price': jsonFormatted.price,
      'weight': jsonFormatted.weight
    })
    fileHandler.write(conf.data.products, '{"products": ' + JSON.stringify(productsList) + '}', (err) => {
      if (err) throw err
      callback(null, productsList)
    })
  } catch (InvalidNameError) {
    callback(InvalidNameError)
  }
}

module.exports = {
  addData,
  addProduct
}
