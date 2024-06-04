import db from "../model/index.js";
import controller from "../controller/product.controller.js";

export default function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept",
    );
    next();
  });

  app.post("/api/seed/types", [], controller.addType);

  app.post("/api/seed/brands", [], controller.addBrand);

  app.post("/api/seed/products", [], controller.addProduct);
}
