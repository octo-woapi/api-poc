const path = require('path')

module.exports = {
  test: {
    data: {
      products: path.resolve(__dirname, `../products/data/test.json`),
      orders: path.resolve(__dirname, `../orders/data/test.json`),
      bills: path.resolve(__dirname, `../bills/data/test.json`)
    }
  },
  development: {
    data: {
      products: path.resolve(__dirname, `../products/data/test.json`),
      orders: path.resolve(__dirname, `../orders/data/test.json`),
      bills: path.resolve(__dirname, `../bills/data/test.json`)
    }
  }
}
