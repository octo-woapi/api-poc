function updateOrCreate (isValidOrder, alreadyExist, update, add, format, updateTotalsList) {
  return (orderId, orderData) => {
    if (!isValidOrder(orderData)) {
      throw new InvalidOrderFormatError('Missing id and/or productsList in the order')
    }
    orderData = format(orderData)
    if (alreadyExist(orderId)) {
      return updateTotalsList(update(orderId, orderData))
    }
    return updateTotalsList(add(orderId, orderData))
  }
}

class InvalidOrderFormatError extends Error {
}

module.exports = (isValidOrder, alreadyExist, update, add, format, updateTotalsList) => {
  return {
    updateOrCreate: updateOrCreate(isValidOrder,
      alreadyExist, update, add, format, updateTotalsList),
    InvalidOrderFormatError
  }
}
