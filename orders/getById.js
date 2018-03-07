function getById (id, orders) {
  for (let keyOrder in orders) {
    if (orders[keyOrder].id === id) {
      return orders[keyOrder]
    }
  }
  return {}
}

module.exports = getById