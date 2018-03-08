function getById (fileHandler, id) {
  const orders = fileHandler.read().orders
  if (!orders.find((order) => order.id === id)) {
    throw new OrderNotFoundError(`Order with ID:${id} does not exist`)
  }
  return orders.find((order) => order.id === id)
}

class OrderNotFoundError extends Error {}

module.exports = {
  getById,
  OrderNotFoundError
}
