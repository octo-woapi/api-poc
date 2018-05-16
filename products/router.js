const { isQueryParams } = require("../server/validator/isQueryParams.js");
const isValidId = require("../server/validator/isValidId");
const getData = require("../server/tools/getRequestData");
const sort = require("./domain/sort.js");
const {
  validateProduct,
  InvalidProductFormatError
} = require("./validator/validateProduct");
const fileHandler = require("../server/tools/fileHandler");
const alreadyExist = require("../server/validator/alreadyExist");

const env = process.env.NODE_ENV || "development";
const conf = require("../server/conf")[env];

const fileHandlers = {
  products: fileHandler(conf.data.products)
};
const { products } = require("./usecase/getList.js")(fileHandlers.products);
const { getById } = require("./usecase/getById")(fileHandlers.products);
const { add } = require("./usecase/add")(
  fileHandlers.products,
  validateProduct,
  alreadyExist
);

async function router(req, res, route, params) {
  if (req.method === "GET") {
    const MORE_PARAMS = 1;
    if (route.length <= MORE_PARAMS && !params) {
      res.writeHead(200);
      return res.end(JSON.stringify(products));
    }
    let id = parseInt(route[MORE_PARAMS]);
    if (isValidId(id)) {
      try {
        let product = getById(id);
        res.writeHead(200);
        return res.end(JSON.stringify(product));
      } catch (errGetById) {
        res.statusCode = 404;
        return res.end(errGetById.toString());
      }
    }
    try {
      if (isQueryParams(params)) {
        res.statusCode = 200;
        return res.end(JSON.stringify(products.sort(sort(params.sort))));
      }
    } catch (errQueryParams) {
      res.statusCode = 400;
      return res.end();
    }
  }
  if (req.method === "POST") {
    let data;
    try {
      data = await getData(req);
    } catch (err) {
      res.statusCode = 400;
      return res.end();
    }
    try {
      const result = await add(JSON.parse(data));
      res.statusCode = 200;
      return res.end(JSON.stringify(result));
    } catch (addError) {
      if (addError instanceof InvalidProductFormatError) {
        res.statusCode = 400;
        res.end("Product name must be defined");
      } else {
        console.log(addError);
        res.statusCode = 500;
        res.end();
      }
    }
  }
}

module.exports = router;
