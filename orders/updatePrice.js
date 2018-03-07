function updatePrice (order, getProductData) {
  if (order.productsList.length < 1) { return order }
  let weight
  let shipmentAmount
  let totalAmount
  let discount
  for (let productKey in order.productsList) {
    let productInfo = getProductData.getData(order.productsList[productKey].id)
    weight += productInfo.weight * order.productsList[productKey].quantity
    totalAmount += productInfo.price * order.productsList[productKey].quantity
  }
  order.weight = weight
  return order
}

module.exports = updatePrice
