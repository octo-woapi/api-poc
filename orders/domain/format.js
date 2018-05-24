function format (newOrderData) {
  const DEFAULT_SHIPMENT_AMOUNT = 0
  const DEFAULT_TOTAL_AMOUNT = 0
  const DEFAULT_WEIGHT = 0

  const defaultOrder = {
    shipmentAmount: DEFAULT_SHIPMENT_AMOUNT,
    totalAmount: DEFAULT_TOTAL_AMOUNT,
    weight: DEFAULT_WEIGHT
  }
  const response = Object.assign(defaultOrder, newOrderData)
  return response
}

module.exports = format
