function alreadyExist (fileHandler) {
  return (orderId) => {
    const orders = fileHandler.read()
    if (orders.find((order) => { return order.id === orderId })) return true
    return false
  }
}

module.exports = (fileHandler) => {
  return {
    alreadyExist: alreadyExist(fileHandler)
  }
}
