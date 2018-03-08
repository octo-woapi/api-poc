function addData (orderId, orderData, format, priceUpdate, fileHandlers) {
  orderData = format(orderData)
  orderData = priceUpdate(orderData)
  const orders = fileHandlers.orders.read().orders
  orders.push({id: orderId, value: orderData})
  fileHandlers.orders.write({orders: orders})
  return orders
}

module.exports = addData
