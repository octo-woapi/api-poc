function updateAndCreate (orderId, orderData, alreadyExist, update, add, fileHandlers) {
  const orders = fileHandlers.orders.read().orders
  if (alreadyExist(orderId, orders)) {
    return update(orderId, orderData, fileHandlers)
  }
  return add(orderId, orderData, fileHandlers)
}

module.exports = updateAndCreate
