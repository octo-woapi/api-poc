const DEFAULT_PRICE = 0;
const DEFAULT_WEIGHT = 0;

function formatProduct(product) {
  if (!product.price) {
    product.price = DEFAULT_PRICE;
  } else {
    product.price = parseFloat(product.price);
  }
  if (!product.weight) {
    product.weight = DEFAULT_WEIGHT;
  } else {
    product.weight = parseFloat(product.weight);
  }
  return product;
}

class InvalidProductFormatError extends Error {}

function validateProduct(product) {
  if (!product.name) {
    throw new InvalidProductFormatError("Name must be defined");
  }
  product = formatProduct(product);
  return product;
}

module.exports = {
  validateProduct,
  InvalidProductFormatError
};
