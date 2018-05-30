function getList (fileHandler) {
  return fileHandler.read()
}

module.exports = () => {
  return {
    getList
  }
}
