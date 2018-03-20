function isQueryParams (params) {
  if (!params) {
    return false
  } else if (!params.sort) {
    return false
  } else if (params.sort !== 'name' && params.sort !== 'price' && params.sort !== 'weight') {
    throw new InvalidParameterError('Parameter is invalid')
  } else {
    return true
  }
}

class InvalidParameterError extends Error {}

module.exports = {isQueryParams, InvalidParameterError}
