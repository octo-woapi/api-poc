function getList (fileHandler) {
  return fileHandler.read().products
}

module.exports = (fileHandler) => {
  return {
    getList: getList(fileHandler)
  }
}
