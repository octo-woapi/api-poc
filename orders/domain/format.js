function format (newOrderData) {
  const DEFAULT_SHIPMENT_AMOUNT = 0
  const DEFAULT_TOTAL_AMOUNT = 0
  const DEFAULT_WEIGHT = 0

  const order = newOrderData
  order.shipmentAmount = newOrderData.shipmentAmount ? newOrderData.shipmentAmount : DEFAULT_SHIPMENT_AMOUNT
  order.totalAmount = newOrderData.totalAmount ? newOrderData.totalAmount : DEFAULT_TOTAL_AMOUNT
  order.weight = newOrderData.weight ? newOrderData.weight : DEFAULT_WEIGHT
  return order
}

module.exports = format
