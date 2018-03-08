function update (orderId, orderData, format, isValidOrder, priceUpdate, fileHandlers) {
  const orders = fileHandlers.orders.read().orders
  const orderIndex = orders.findIndex((order) => {
    return order.id === orderId
  })
  if (!isValidOrder(orderData)) {
    throw new InvalidOrderFormatError('Missing id and/or productsList in the order')
  }
  orderData = format(orderData)
  orderData = priceUpdate(orderData)
  orders[orderIndex].value = orderData
  fileHandlers.orders.write(orders)
  return orders
}

class InvalidOrderFormatError extends Error {}

module.exports = {
  update,
  InvalidOrderFormatError
}
