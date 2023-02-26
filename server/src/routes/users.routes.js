const controllers = require("../controllers");
const validations = require("../validations");
const middleware = require("../middleware");

module.exports = require("express")
  .Router()
  .get("/", controllers.users.get)
  .get("/:_id", controllers.users.getOne)
  .post(
    "/",
    middleware.auth,
    validations.users.create,
    middleware.validate,
    controllers.users.create
  )
  .put(
    "/:_id",
    middleware.auth,
    validations.users.update,
    middleware.validate,
    controllers.users.update
  )
  .delete(
    "/:_id",
    middleware.auth,
    validations.users.delete,
    middleware.validate,
    controllers.users.remove
  );
