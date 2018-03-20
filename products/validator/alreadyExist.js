function alreadyExist (fileHandler) {
  return (productId) => {
    const products = fileHandler.read().products
    if (products.find((product) => { return product.id === productId })) return true
    return false
  }
}

module.exports = (fileHandler) => {
  return {
    alreadyExist: alreadyExist(fileHandler)
  }
}
