function getList (fileHandlers) {
  const orders = fileHandlers.orders.read().orders
  return orders
}

function getById (id, fileHandlers) {
  const orders = fileHandlers.orders.read().orders
  if (!orders.find((order) => order.id === id)) {
    throw new OrderNotFoundError(`Order with ID:${id} does not exist`)
  }
  return orders.find((order) => order.id === id)
}

class OrderNotFoundError extends Error {}

module.exports = {
  getList,
  getById,
  OrderNotFoundError
}
