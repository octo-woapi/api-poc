const validator = require('./validator.js')

function getList (fileHandlers) {
  try {
    return fileHandlers.products.read().products
  } catch (FileNotFoundError) {
    return undefined // A vérifier, que faire de cette erreur
  }
}

function getById (id, fileHandlers) {
  if (!validator.isValidId(id)) {
    throw new InvalidArgumentError('Id is not defined or not a number')
  }
  return getList(fileHandlers).find((product) => product.id === id)
}

class InvalidArgumentError extends Error {
}

module.exports = {
  getList,
  getById,
  InvalidArgumentError
}
