function format (priceUpdate, newOrderData, oldOrderData) {
  const DEFAULT_STATUS = 'pending'
  const DEFAULT_PRODUCTS_LIST = []
  const DEFAULT_SHIPMENT_AMOUNT = 0
  const DEFAULT_TOTAL_AMOUNT = 0
  const DEFAULT_WEIGHT = 0

  const order = oldOrderData || {status: DEFAULT_STATUS, productsList: DEFAULT_PRODUCTS_LIST}

  if (newOrderData.productsList) {
    order.productsList = order.productsList.concat(newOrderData.productsList)
  }
  if (newOrderData.status) { order.status = newOrderData.status }
  order.shipmentAmount = newOrderData.shipmentAmount ? newOrderData.shipmentAmount : DEFAULT_SHIPMENT_AMOUNT
  order.totalAmount = newOrderData.totalAmount ? newOrderData.totalAmount : DEFAULT_TOTAL_AMOUNT
  order.weight = newOrderData.weight ? newOrderData.weight : DEFAULT_WEIGHT
  return order
}

module.exports = format
