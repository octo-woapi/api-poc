const isValidOrder = require("./validator/isValidOrder");
const isValidId = require("../server/validator/isValidId");
const format = require("./domain/format");
const fileHandler = require("../server/tools/fileHandler");
const getData = require("../server/tools/getRequestData");

const env = process.env.NODE_ENV || "development";
const conf = require("../server/conf")[env];

const fileHandlers = {
  orders: fileHandler(conf.data.orders),
  products: fileHandler(conf.data.products),
  bills: fileHandler(conf.data.bills)
};

const alreadyExist = require("../server/validator/alreadyExist");
const { getById } = require("./usecase/getById")(fileHandlers.orders);
const getProductById = require("../products/usecase/getById")(
  fileHandlers.products
).getById;
const { updateTotals } = require("./domain/updateTotals")(getProductById);
const { updateTotalsList } = require("./domain/updateTotalsList")(updateTotals);
const createBill = require("../bills/usecase/add")(fileHandlers.bills).add;
const { update } = require("./usecase/update")(
  fileHandlers.orders,
  updateTotalsList,
  createBill
);
const { add } = require("./usecase/add")(fileHandlers.orders, updateTotalsList);
const { deleteOrder } = require("./usecase/deleteOrder")(fileHandlers.orders);
const {
  updateOrCreate,
  InvalidOrderFormatError
} = require("./usecase/updateAndCreate")(
  isValidOrder,
  alreadyExist,
  update,
  add,
  format
);

async function router(req, res, route, id) {
  if (req.method === "PUT" || req.method === "POST") {
    let data;
    try {
      data = await getData(req);
    } catch (err) {
      res.statusCode = 400;
      res.end(err);
    }

    if (req.method === "PUT") {
      if (!isValidId(id)) {
        res.statusCode = 400;
        res.end("Invalid ID, can not PUT data");
      }
    }

    try {
      const updatedOrders = updateOrCreate(id, JSON.parse(data));
      res.statusCode = 200;
      res.end(JSON.stringify(updatedOrders));
    } catch (errUpdate) {
      if (errUpdate instanceof InvalidOrderFormatError) {
        res.statusCode = 400;
        res.end(
          "Invalid format Error: id and products must be defined and status can only " +
            "be pending, paid or cancel"
        );
      }
    }
  }
  if (req.method === "GET") {
    if (isValidId(id)) {
      if (alreadyExist(id)) {
        res.statusCode = 200;
        res.end(JSON.stringify(getById(id)));
      } else {
        res.statusCode = 403;
        res.end("Forbidden");
      }
    }
    res.statusCode = 200;
    res.end(JSON.stringify(getList));
  }
  if (req.method === "DELETE") {
    if (isValidId(id)) {
      deleteOrder(id);
      res.statusCode = 204;
      res.end();
    }
  }
}

module.exports = router;
