function add (fileHandler) {
  return (json, validator) => {
    validator.isNameDefined(json)
    const jsonFormatted = validator.formatInputs(json)
    const productsList = fileHandler.read().products
    let lastId = -1
    if (productsList.length > 0) lastId = productsList[productsList.length - 1].id
    const newId = lastId + 1
    productsList.push({
      'id': newId,
      'name': jsonFormatted.name,
      'price': jsonFormatted.price,
      'weight': jsonFormatted.weight
    })
    fileHandler.write('{"products": ' + JSON.stringify(productsList) + '}')
    return {products: productsList}
  }
}

module.exports = (fileHandler) => {
  return {
    add: add(fileHandler)
  }
}
