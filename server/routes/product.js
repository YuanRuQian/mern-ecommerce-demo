import controller from "../controller/product.controller.js";
import authJwt from '../middleware/authJwt.js'

export default function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/products",
        [
            authJwt.verifyToken
        ],
        controller.getProducts
    );

    app.get(
        "/api/brands",
        [
            authJwt.verifyToken
        ],
        controller.getBrands
    );

    app.get(
        "/api/types",
        [
            authJwt.verifyToken
        ],
        controller.getTypes
    );

    app.get(
        "/api/products/:id",
        [
            authJwt.verifyToken
        ],
        controller.getProductById
    );

    app.get(
        "/api/products/brand/:id",
        [
            authJwt.verifyToken
        ],
        controller.getProductsByBrand
    );
};