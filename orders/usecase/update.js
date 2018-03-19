function update (fileHandler) {
  return (orderId, orderData) => {
    const orders = fileHandler.read().orders
    const orderIndex = orders.findIndex((order) => {
      return order.id === parseInt(orderId)
    })
    orders[orderIndex] = {id: orderId, productsList: orderData.productsList}
    fileHandler.write({orders: orders})
    return orders
  }
}

module.exports = (fileHandler) => {
  return {
    update: update(fileHandler)
  }
}
