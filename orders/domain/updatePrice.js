function updatePrice (order, getProductById, fileHandlers,
  calculateShippingAmount, applyDiscount) {
  if (order.productsList.length < 1) { return order }
  order.weight = 0
  let productPrice = 0
  for (let productKey in order.productsList) {
    let productInfo = getProductById(fileHandlers, order.productsList[productKey].id)
    order.weight += productInfo.weight * order.productsList[productKey].quantity
    productPrice += productInfo.price * order.productsList[productKey].quantity
  }
  order.shipmentAmount = calculateShippingAmount(order.weight)
  console.log(productPrice + order.shipmentAmount)
  order.totalAmount = applyDiscount(productPrice + order.shipmentAmount)
  return order
}

module.exports = updatePrice
