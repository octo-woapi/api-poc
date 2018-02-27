function isQueryParams (params) {
  if (!params) {
    return false
  } else if (params.indexOf('sort') !== -1 && params.indexOf('name') !== -1 && params.indexOf('price') !== -1 && params.indexOf('weight') !== -1) {
    return false
  } else {
    return true
  }
}

function isValidId (id) {
  return typeof id === 'number'
}

class InvalidNameError extends Error {}

function isNameDefined (inputs) {
  if (!inputs.name) {
    throw new InvalidNameError('Name of the product is undefined')
  }
}

const DEFAULT_PRICE = 0

function formatInputs (inputs) {
  if (!inputs.price) {
    inputs.price = DEFAULT_PRICE
  } else {
    inputs.price = parseFloat(inputs.price)
  }
  if (!inputs.weight) {
    inputs.weight = DEFAULT_PRICE
  } else {
    inputs.weight = parseFloat(inputs.weight)
  }
  return inputs
}

module.exports = {
  isQueryParams,
  isValidId,
  InvalidNameError,
  formatInputs,
  isNameDefined
}
