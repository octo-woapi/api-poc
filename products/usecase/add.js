function add(fileHandler, validateProduct, alreadyExist) {
  return async product => {
    product = validateProduct(product);
    const products = fileHandler.read();
    let id = 0;
    while (alreadyExist(products, id)) {
      id++;
    }
    products.push({
      id: id,
      name: product.name,
      price: product.price,
      weight: product.weight
    });
    await fileHandler.write(products);
    return products;
  };
}

module.exports = (fileHandler, validateProduct, alreadyExist) => {
  return {
    add: add(fileHandler, validateProduct, alreadyExist)
  };
};
