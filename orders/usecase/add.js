function add (fileHandler) {
  return (orderId, orderData) => {
    const orders = fileHandler.read().orders
    orders.push(JSON.parse(orderData))
    fileHandler.write({orders: orders})
    return orders
  }
}

module.exports = (fileHandler) => {
  return {
    add: add(fileHandler)
  }
}
