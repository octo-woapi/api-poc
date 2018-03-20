function add (fileHandler) {
  return (newId, inputs) => {
    const productsList = fileHandler.read().products
    productsList.push({
      'id': newId,
      'name': inputs.name,
      'price': inputs.price,
      'weight': inputs.weight
    })
    fileHandler.write({'products': productsList})
    return {products: productsList}
  }
}

module.exports = (fileHandler) => {
  return {
    add: add(fileHandler)
  }
}
