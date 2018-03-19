function updateOrCreate (orderId, orderData, isValidOrder, alreadyExist, update, add, format, updateTotalsList, getProductById) {
  if (!isValidOrder(orderData)) {
    throw new InvalidOrderFormatError('Missing id and/or productsList in the order')
  }
  orderData = format(orderData)
  if (alreadyExist(orderId)) {
    return updateTotalsList(update(orderId, orderData), getProductById)
  }
  return updateTotalsList(add(orderId, orderData), getProductById)
}

class InvalidOrderFormatError extends Error {
}

module.exports = {
  updateOrCreate,
  InvalidOrderFormatError
}
