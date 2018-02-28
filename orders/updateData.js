
function updateOrdersList (orderId, orderData, fileHandler) {
  const orders = JSON.parse(fileHandler.read()).orders
  const orderIndex = findOrderIndexFromId(orders, orderId)
  orders[orderIndex].value = orderData
  fileHandler.write(JSON.stringify(orders))
  return orders
}

function findOrderIndexFromId (orders, orderId) {
  function findOrderId (order) {
    return order.id === orderId
  }
  return orders.findIndex(findOrderId)
}

module.exports = {
  updateOrdersList,
  findOrderIndexFromId
}
