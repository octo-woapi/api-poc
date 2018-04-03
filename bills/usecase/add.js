function add (fileHandler) {
  return (orderId, amount) => {
    const createdAt = new Date()
    fileHandler.write(createdAt, orderId, amount)
  }
}

module.exports = (fileHandler) => {
  return {
    add: add(fileHandler)
  }
}
