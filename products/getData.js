const fs = require('fs')
const validator = require('./validator.js')
const env = process.env.NODE_ENV || 'development'
const conf = require('../server/conf')[env]

function getProducts () {
  try {
    const productsJSON = JSON.parse(fs.readFileSync(conf.data.products, 'utf8'))
    const products = productsJSON.products
    return products
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new FileNotFoundError('File not found')
    } else {
      throw err
    }
  }
}

class FileNotFoundError extends Error {
}

function getProduct (id) {
  if (!validator.isValidId(id)) {
    throw new InvalidArgumentError('Id is not defined or not a number')
  }

  return getProducts().find((product) => product.id === id)
}

class InvalidArgumentError extends Error {
}

module.exports = {
  getProducts,
  getProduct,
  InvalidArgumentError,
  FileNotFoundError
}
