const path = require('path')

module.exports = {
  test: {
    data: {
      products: path.resolve(__dirname, `../products/data-test.json`)
    }
  },
  development: {
    data: {
      products: path.resolve(__dirname, `../products/data-development.json`)
    }
  }
}
