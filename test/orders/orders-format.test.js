const formatOrderData = require('../../orders/format')

describe('formatOrderData(:priceUpdate, :newOrderData, :existingOrderData)', () => {
  describe('when nothing is defined', () => {
    it('returns the default format', () => {
      const defaultFormat = {status: 'pending',
        productsList: [],
        shipmentAmount: 0,
        totalAmount: 0,
        weight: 0}
      const priceUpdate = jest.fn()
      expect(formatOrderData(priceUpdate, {})).toEqual(defaultFormat)
    })
  })
  describe('when status is defined', () => {
    it('returns the order with the defined status and then the default format', () => {
      const orderDataExpected = {status: 'paid',
        productsList: [],
        shipmentAmount: 0,
        totalAmount: 0,
        weight: 0}
      const priceUpdate = jest.fn()
      expect(formatOrderData(priceUpdate, {status: 'paid'})).toEqual(orderDataExpected)
    })
  })
  describe('when there is existing data', () => {
    it('update the status', () => {
      const newStatus = 'cancel'
      const existingOrderData = { status: 'paid',
        productsList: [],
        shipmentAmount: 0,
        totalAmount: 0,
        weight: 0 }
      const priceUpdate = jest.fn()
      const newOrderData = {status: newStatus}
      const formattedOrderData = formatOrderData(priceUpdate, newOrderData, existingOrderData)
      expect(formattedOrderData.status).toEqual(newStatus)
    })
    it('add products in the existing products list', () => {
      const oldProductsList = [{name: 'banana', quantity: 100}]
      const newProductsList = [{name: 'orange', quantity: 500}]
      const existingOrderData = { status: 'paid',
        productsList: oldProductsList,
        shipmentAmount: 0,
        totalAmount: 0,
        weight: 0 }
      const priceUpdate = jest.fn()
      const newOrderData = {productsList: newProductsList}
      const formattedOrderData = formatOrderData(priceUpdate, newOrderData, existingOrderData)
      expect(formattedOrderData.productsList).toEqual(oldProductsList.concat(newProductsList))
    })
  })
  describe('when a products is added it update the weight, the shipment amount, ' +
    'the total amount and the discount', () => {
    it('calls priceUpdate', () => {
      const priceUpdate = jest.fn()
      formatOrderData(priceUpdate, {})
      const order = { status: 'pending',
        productsList: [],
        shipmentAmount: 0,
        totalAmount: 0,
        weight: 0 }
      expect(priceUpdate).toBeCalledWith(order)
    })
  })
})
