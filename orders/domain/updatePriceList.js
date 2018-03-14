const updatePrice = require('./updatePrice')

function updatePriceList (orders, getProductById) {
  if (orders.length < 1) {
    return orders
  }
  for (let orderKey in orders) {
    orders[orderKey] = updatePrice(orders[orderKey], getProductById)
  }
  return orders
}

module.exports = updatePriceList
