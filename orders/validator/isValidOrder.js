function isValidOrder (newOrder) {
  const AUTHORIZED_STATUS = ['pending', 'cancel', 'paid']
  if (newOrder && newOrder.id && newOrder.productsList &&
    Array.isArray(newOrder.productsList)) {
    if (newOrder.status) {
      if (AUTHORIZED_STATUS.indexOf(newOrder.status.toLowerCase()) > -1) {
        return true
      }
      return false
    }
    return true
  }
  return false
}

module.exports = isValidOrder
