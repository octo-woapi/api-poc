function update (orderId, orderData, format, fileHandlers) {
  const orders = fileHandlers.orders.read().orders
  const orderIndex = orders.findIndex((order) => {
    return order.id === orderId
  })
  orderData = format(orderData, orders[orderIndex])
  orders[orderIndex].value = orderData
  fileHandlers.orders.write(orders)
  return orders
}

module.exports = update
