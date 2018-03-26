function alreadyExist (fileHandler) {
  return (productId) => {
    const products = fileHandler.read()
    return products.some((product) => product.id === productId)
  }
}

module.exports = (fileHandler) => {
  return {
    alreadyExist: alreadyExist(fileHandler)
  }
}
