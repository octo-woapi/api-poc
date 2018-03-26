function add (fileHandler) {
  return (newId, inputs) => {
    const productsList = fileHandler.read()
    productsList.push({
      'id': newId,
      'name': inputs.name,
      'price': inputs.price,
      'weight': inputs.weight
    })
    fileHandler.write(productsList)
    return productsList
  }
}

module.exports = (fileHandler) => {
  return {
    add: add(fileHandler)
  }
}
