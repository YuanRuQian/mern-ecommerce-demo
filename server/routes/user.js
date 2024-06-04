import controller from "../controller/user.controller.js";
import authJwt from "../middleware/authJwt.js";

const { isAdmin, verifyToken, isUser, canAccessUserData } = authJwt;

export default function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept",
    );
    next();
  });

  app.get("/api/users", [verifyToken, isAdmin], controller.getAllUsers);

  app.get(
    "/api/users/:userId",
    [verifyToken, isAdmin, isUser, canAccessUserData],
    controller.getUserByUserId,
  );

  app.post(
    "/api/users/favorites",
    [verifyToken],
    controller.addProductToFavorites,
  );

  app.delete(
    "/api/users/favorites/:productId",
    [verifyToken],
    controller.removeProductFromFavorites,
  );
}
