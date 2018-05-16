function add(fileHandler, alreadyExist, updateTotalsList) {
  return async () => {
    let orders = await fileHandler.read();
    let id = 0;
    while (alreadyExist(orders, id)) {
      id++;
    }
    orders.push({ id: id, productsList: [], status: "pending" });
    orders = updateTotalsList(orders);
    await fileHandler.write(orders);
    return orders;
  };
}

module.exports = (fileHandler, alreadyExist, updateTotalsList) => {
  return {
    add: add(fileHandler, alreadyExist, updateTotalsList)
  };
};
