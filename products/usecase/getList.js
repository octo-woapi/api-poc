const validator = require('../validator/isQueryParams.js')

function getList (fileHandler) {
  return fileHandler.read().products
}

function getById (fileHandler) {
  return (id) => {
    if (!validator.isValidId(id)) {
      throw new InvalidArgumentError('Id is not defined or not a number')
    }
    return getList(fileHandler).find((product) => product.id === id)
  }
}

class InvalidArgumentError extends Error {}

module.exports = (fileHandler) => {
  return {
    getList: getList(fileHandler),
    getById: getById(fileHandler),
    InvalidArgumentError
  }
}
