function add(fileHandler, alreadyExist, updateTotalsList) {
  return async (id, data) => {
    let orders = await fileHandler.read()
    if (id !== 0 && !id) {
      id = 0
      while (alreadyExist(orders, id)) {
        id++
      }
    }
    const DEFAULT_ORDER = {id: id, productsList: [], status: 'pending'}
    const order = data ? data : DEFAULT_ORDER
    orders.push(order)
    orders = updateTotalsList(orders)
    await fileHandler.write(orders)
    return orders
  }
}

module.exports = (fileHandler, alreadyExist, updateTotalsList) => {
  return {
    add: add(fileHandler, alreadyExist, updateTotalsList)
  }
}
