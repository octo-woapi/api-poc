function add (fileHandler) {
  return (newId, inputs) => {
    return new Promise((resolve) => {
      const productsList = fileHandler.read()
      productsList.push({
        'id': newId,
        'name': inputs.name,
        'price': inputs.price,
        'weight': inputs.weight
      })
      resolve(fileHandler.write(productsList))
    })
  }
}

module.exports = (fileHandler) => {
  return {
    add: add(fileHandler)
  }
}
