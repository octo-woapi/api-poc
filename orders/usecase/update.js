function update (orderId, orderData, fileHandlers) {
  const orders = fileHandlers.orders.read().orders
  const orderIndex = orders.findIndex((order) => {
    return order.id === orderId
  })
  orders[orderIndex].value = orderData
  fileHandlers.orders.write(orders)
  return orders
}

module.exports = update
