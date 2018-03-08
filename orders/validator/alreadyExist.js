function alreadyExist (orderId, orders) {
  if (orders.find((order) => { return order.id === orderId })) { return true }
  return false
}

module.exports = {
  alreadyExist
}
