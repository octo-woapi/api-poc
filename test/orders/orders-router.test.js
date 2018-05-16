const request = require("request");
const {
  startApi,
  deleteAllOrders,
  addOrder,
  deleteAllBills
} = require("../helpers");
const PORT = 3002;

const fs = require("fs");

startApi(PORT);

describe("Orders", () => {
  beforeEach(async () => {
    await deleteAllOrders();
    await addOrder(1, {
      id: 1,
      productsList: [{ id: 1, name: "orange", quantity: 100 }]
    });
  });
  describe("PUT /orders/1", () => {
    describe("When the order id is not precise", () => {
      it("returns 400", done => {
        request(
          {
            url: `http://localhost:${PORT}/orders`,
            method: "PUT",
            json: { productsList: [] }
          },
          (err, res) => {
            if (err) console.log(err);
            expect(res.statusCode).toBe(400);
            done();
          }
        );
      });
      it("returns an invalid id error", done => {
        request(
          {
            url: `http://localhost:${PORT}/orders`,
            method: "PUT",
            json: { productsList: [] }
          },
          (err, res) => {
            if (err) console.log(err);
            expect(res.body).toBe("Invalid ID, can not PUT data");
            done();
          }
        );
      });
    });
    describe("When the sent order does not respect the expected format", () => {
      it("returns 400", done => {
        request(
          {
            url: `http://localhost:${PORT}/orders/1`,
            method: "PUT",
            json: { data: "fake data" }
          },
          (err, res) => {
            if (err) console.log(err);
            expect(res.statusCode).toBe(400);
            done();
          }
        );
      });
      it("returns an invalid format error", done => {
        request(
          {
            url: `http://localhost:${PORT}/orders/1`,
            method: "PUT",
            json: { data: "fake data" }
          },
          (err, res) => {
            if (err) console.log(err);
            expect(res.body).toBe(
              "Invalid format Error: id and products must be defined " +
                "and status can only be pending, paid or cancel"
            );
            done();
          }
        );
      });
    });
    describe("When the order exists", () => {
      it("returns 200", done => {
        request(
          {
            url: `http://localhost:${PORT}/orders/1`,
            method: "PUT",
            json: { id: 1, productsList: [] }
          },
          (err, res) => {
            if (err) console.log(err);
            expect(res.statusCode).toBe(200);
            done();
          }
        );
      });
    });
  });

  describe("POST /orders", () => {
    describe("when the format of the orderData is invalid", () => {
      it("returns 400", done => {
        request(
          {
            url: `http://localhost:${PORT}/orders/1`,
            method: "POST",
            json: { data: "fake data" }
          },
          (err, res) => {
            if (err) console.log(err);
            expect(res.statusCode).toBe(400);
            done();
          }
        );
      });
    });
    describe("when everything is fine", () => {
      it("returns 200", done => {
        request(
          {
            url: `http://localhost:${PORT}/orders`,
            method: "POST",
            json: { productsList: [] }
          },
          (err, res) => {
            if (err) console.log(err);
            expect(res.statusCode).toBe(200);
            done();
          }
        );
      });
      it("adds the order in the list", done => {
        request(
          {
            url: `http://localhost:${PORT}/orders`,
            method: "POST",
            json: { productsList: [{ id: 1, name: "orange", quantity: 100 }] }
          },
          (err, res) => {
            if (err) console.log(err);
            console.log(res.body);
            expect(res.body.slice(-1)[0]).toEqual(
              JSON.parse(
                fs.readFileSync(
                  "/Users/" + "romaincalamier/api-poc/orders/data/test.json",
                  "utf-8"
                )
              ).slice(-1)[0]
            );
            done();
          }
        );
      });
    });
    describe("when the status is updated from pending to paid", () => {
      it("creates a new bill of the order", async done => {
        await deleteAllBills();
        request(
          {
            url: `http://localhost:${PORT}/orders/1`,
            method: "POST",
            json: {
              productsList: [{ id: 1, name: "fake fruit" }],
              status: "paid"
            }
          },
          (err, res) => {
            if (err) console.log(err);
            expect(
              JSON.parse(
                fs.readFileSync(
                  "/Users/" + "romaincalamier/api-poc/bills/data/test.json",
                  "utf-8"
                )
              )
            ).toEqual([]);
            done();
          }
        );
      });
    });
  });

  describe("GET /orders", () => {
    describe("when everything is fine", () => {
      it("returns orders", done => {
        request({ url: `http://localhost:${PORT}/orders` }, (err, res) => {
          if (err) console.log(err);
          expect(JSON.parse(res.body).getList).toEqual(
            JSON.parse(
              fs.readFileSync(
                "/Users/" + "romaincalamier/api-poc/orders/data/test.json",
                "utf-8"
              )
            )
          );
          done();
        });
      });
    });
    describe("when an id is precise", () => {
      describe("if this id does not correspond to an existing order", () => {
        it("returns 403", done => {
          request({ url: `http://localhost:${PORT}/orders/2` }, (err, res) => {
            if (err) console.log(err);
            expect(res.statusCode).toBe(403);
            done();
          });
        });
      });
      describe("if the id correspond to an existing order", () => {
        it("returns the order wanted", done => {
          request({ url: `http://localhost:${PORT}/orders/1` }, (err, res) => {
            if (err) console.log(err);
            expect(JSON.parse(res.body)).toEqual(
              JSON.parse(
                fs.readFileSync(
                  "/Users/" + "romaincalamier/api-poc/orders/data/test.json",
                  "utf-8"
                )
              )[0]
            );
            done();
          });
        });
      });
    });
  });

  describe("DELETE /orders/1", () => {
    describe("when the order is deleted", () => {
      it("returns 200", done => {
        request(
          { url: `http://localhost:${PORT}/orders/1`, method: "DELETE" },
          (err, res) => {
            if (err) console.log(err);
            expect(res.statusCode).toBe(204);
            done();
          }
        );
      });
      it("deletes the order wanted", done => {
        request(
          { url: `http://localhost:${PORT}/orders/1`, method: "DELETE" },
          (err, res) => {
            if (err) console.log(err);
            console.log();
            expect(
              JSON.parse(
                fs.readFileSync(
                  "/Users/" + "romaincalamier/api-poc/orders/data/test.json",
                  "utf-8"
                )
              )
            ).toEqual([]);
            done();
          }
        );
      });
    });
  });
});
