function add (fileHandler) {
  return (orderId, orderData) => {
    const orders = fileHandler.read()
    orders.push({id: orderId, productsList: orderData.productsList})
    fileHandler.write(orders)
    return orders
  }
}

module.exports = (fileHandler) => {
  return {
    add: add(fileHandler)
  }
}
