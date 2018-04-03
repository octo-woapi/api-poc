function add (fileHandler) {
  return async (orderId, amount) => {
    const createdAt = new Date()
    const bills = await fileHandler.read()
    const id = bills.length
    bills.push({id: id, createdAt: createdAt, orderId: orderId, amount: amount})
    await fileHandler.write(bills)
  }
}

module.exports = (fileHandler) => {
  return {
    add: add(fileHandler)
  }
}
