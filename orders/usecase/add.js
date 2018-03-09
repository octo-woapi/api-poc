function addData (orderId, orderData, fileHandlers) {
  const orders = fileHandlers.orders.read().orders
  orders.push({id: orderId, value: orderData})
  fileHandlers.orders.write({orders: orders})
  return orders
}

module.exports = addData
