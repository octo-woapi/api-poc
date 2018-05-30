function deleteOrder (fileHandler) {
  return async (id) => {
    const orders = fileHandler.read()
    const orderIndex = orders.findIndex((order) => {
      return order.id === parseInt(id)
    })
    orders.splice(orderIndex, 1)
    await fileHandler.write(orders)
    return orders
  }
}

module.exports = (fileHandler) => {
  return {
    deleteOrder: deleteOrder(fileHandler)
  }
}
