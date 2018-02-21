function isQueryParams (params) {
  if (typeof params === 'undefined' || !params) {
    return false
  } else if (params.indexOf('sort') !== -1 && params.indexOf('name') !== -1 && params.indexOf('price') !== -1 && params.indexOf('weight') !== -1) {
    return false
  } else {
    return true
  }
}

function isValidId (id) {
  if (typeof id !== 'number') {
    return false
  } else {
    return true
  }
}

class InvalidNameError extends Error {}

function validateInputs (inputs) {
  if (typeof inputs.name === 'undefined' || !inputs.name) {
    throw new InvalidNameError('Name of the product is undefined')
  } else {
    if (typeof inputs.price === 'undefined' || !inputs.price) {
      inputs.price = 0
    }
    if (typeof inputs.weight === 'undefined' || !inputs.weight) {
      inputs.weight = 0
    }
    return inputs
  }
}

module.exports = {
  isQueryParams,
  isValidId,
  InvalidNameError: InvalidNameError,
  validateInputs
}
