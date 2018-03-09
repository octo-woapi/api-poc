function updateListPrice (orders, updatePrice) {
  if (orders.length < 1) {
    return orders
  }
  for (let orderKey in orders) {
    orders[orderKey] = updatePrice(orders[orderKey])
  }
  return orders
}

module.exports = updateListPrice
