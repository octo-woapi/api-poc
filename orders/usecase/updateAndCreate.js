function updateOrCreate (orderId, orderData, isValidOrder, alreadyExist, update, add, format, updatePriceList, getProductById) {
  if (!isValidOrder(JSON.parse(orderData))) {
    throw new InvalidOrderFormatError('Missing id and/or productsList in the order')
  }
  orderData = format(orderData)
  if (alreadyExist(orderId)) {
    return updatePriceList(update(orderId, orderData), getProductById)
  }
  return updatePriceList(add(orderId, orderData), getProductById)
}

class InvalidOrderFormatError extends Error {
}

module.exports = {
  updateOrCreate,
  InvalidOrderFormatError
}
