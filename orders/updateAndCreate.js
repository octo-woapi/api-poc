function main (orderId, orderData, alreadyExists, update, fileHandler) {
  if (alreadyExists(orderId)) {
    return update(orderId, orderData, fileHandler)
  }
}

module.exports = main
