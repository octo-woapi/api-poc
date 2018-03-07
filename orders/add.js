function addData (orderId, orderData, formatOrderData, fileHandlers) {
  orderData = formatOrderData(orderData)
  const orders = fileHandlers.orders.read().orders
  orders.push({id: orderId, value: orderData})
  fileHandlers.orders.write({orders: orders})
  return orders
}

module.exports = addData
