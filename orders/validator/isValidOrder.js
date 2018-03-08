function isValidOrder (orderData) {
  if (!orderData.id && !orderData.productsList) return false
  if (!Array.isArray(orderData.productsList)) return false
  return true
}

module.exports = isValidOrder
