function updatePrice (order, getProductById) {
  if (order.productsList.length < 1) {
    return order
  }
  order.weight = 0
  let productPrice = 0
  /*
  let productsInfo = Array.from(order.productsList, product => { product.id, product.quantity, getProductById(product.id).weight, getProductById(product.id).price })
  order.weight = Array.reduce(productsInfo.weight)
  order.price = Array.reduce(productsInfo.price)
*/
  for (let productKey in order.productsList) {
    let productInfo = getProductById(order.productsList[productKey].id)
    order.weight += productInfo.weight * order.productsList[productKey].quantity
    productPrice += productInfo.price * order.productsList[productKey].quantity
  }
  order.shipmentAmount = calculateShippingAmount(order.weight)
  order.totalAmount = applyDiscount(productPrice + order.shipmentAmount)
  return order
}

function calculateShippingAmount (weight) {
  const WEIGHT_STEP = 10
  const STEP_PRICE = 25
  return (Math.floor(weight / WEIGHT_STEP) + 1) * STEP_PRICE
}

function applyDiscount (price) {
  const DISCOUNT_PRICE = 1000
  const DISCOUNT = 0.05
  if (price < DISCOUNT_PRICE) return price
  return price - price * DISCOUNT
}

module.exports = updatePrice
