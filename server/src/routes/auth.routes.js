const controllers = require("../controllers");
const validations = require("../validations");
const middleware = require("../middleware");

module.exports = require("express")
  .Router()
  .get("/currentUser", middleware.auth, controllers.auth.currentUser)
  .post(
    "/register",
    validations.auth.register,
    middleware.validate,
    controllers.auth.register
  )
  .post(
    "/login",
    validations.auth.login,
    middleware.validate,
    controllers.auth.login
  );
