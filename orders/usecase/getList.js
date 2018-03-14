function getList (fileHandler) {
  return fileHandler.read().orders
}

module.exports = (fileHandler) => {
  return {
    getList: getList(fileHandler)
  }
}
