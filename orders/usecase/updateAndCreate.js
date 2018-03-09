function updateOrCreate (orderId, orderData, isValidOrder, alreadyExist, update, add, fileHandlers, format, updateListPrice) {
  const orders = fileHandlers.orders.read().orders
  if (!isValidOrder(orderData)) {
    throw new InvalidOrderFormatError('Missing id and/or productsList in the order')
  }
  orderData = format(orderData)
  if (alreadyExist(orderId, orders)) {
    return updateListPrice(update(orderId, orderData, fileHandlers))
  }
  return updateListPrice(add(orderId, orderData, fileHandlers))
}

class InvalidOrderFormatError extends Error {}

module.exports = updateOrCreate
