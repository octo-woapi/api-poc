function updateOrCreate (fileHandler, isValidOrder, alreadyExist, update, add, format) {
  return async (orderId, orderData) => {
    if (!isValidOrder(orderData)) {
      throw new InvalidOrderFormatError('Missing id and/or productsList in the order')
    }
    orderData = format(orderData)
    const orders = fileHandler.read()
    if (alreadyExist(orders, orderId)) {
      return await update(orderId, orderData)
    }
    return await add(orderId, orderData)
  }
}

class InvalidOrderFormatError extends Error {
}

module.exports = (fileHandler, isValidOrder, alreadyExist, update, add, format) => {
  return {
    updateOrCreate: updateOrCreate(fileHandler, isValidOrder,
      alreadyExist, update, add, format),
    InvalidOrderFormatError
  }
}
