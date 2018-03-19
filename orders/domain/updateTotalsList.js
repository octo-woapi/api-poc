const updateTotals = require('./updateTotals')

function updateTotalsList (orders, getProductById) {
  if (orders.length < 1) {
    return orders
  }
  for (let orderKey in orders) {
    orders[orderKey] = updateTotals(orders[orderKey], getProductById)
  }
  return orders
}

module.exports = updateTotalsList
