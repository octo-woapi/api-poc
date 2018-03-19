function add (fileHandler) {
  return (orderId, orderData) => {
    const orders = fileHandler.read().orders
    orders.push({id: orderId, productsList: orderData.productsList})
    fileHandler.write({orders: orders})
    return orders
  }
}

module.exports = (fileHandler) => {
  return {
    add: add(fileHandler)
  }
}
