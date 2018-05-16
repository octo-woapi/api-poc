class BillNotFoundError extends Error {}

function deleteBill (fileHandler) {
  return async (id) => {
    let bills = fileHandler.read()
    const index = bills.findIndex((bill) => {
      return bill.id === parseInt(id)
    })
    if (index === -1) {
      throw new BillNotFoundError(`Bill with id ${id} does not exist`)
    }
    bills.splice(index, 1)
    await fileHandler.write(bills)
    return bills
  }
}

module.exports = (fileHandler) => {
  return {
    deleteBill: deleteBill(fileHandler),
    BillNotFoundError
  }
}