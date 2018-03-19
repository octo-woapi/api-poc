function isQueryParams (params) {
  console.log(params)
  if (!params) {
    return false
  } else if (params.indexOf('sort') !== -1 && params.indexOf('name') !== -1 && params.indexOf('price') !== -1 && params.indexOf('weight') !== -1) {
    return false
  } else {
    return true
  }
}

module.exports = isQueryParams
