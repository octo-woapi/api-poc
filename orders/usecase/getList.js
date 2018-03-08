function getList (fileHandler) {
  return fileHandler.read().orders
}

module.exports = getList
