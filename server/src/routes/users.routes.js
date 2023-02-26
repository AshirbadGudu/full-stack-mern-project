const controllers = require("../controllers");
const validations = require("../validations");
const middleware = require("../middleware");

module.exports = require("express")
  .Router()
  .get("/", controllers.users.get)
  .post(
    "/",
    validations.users.create,
    middleware.auth,
    controllers.users.create
  )
  .put(
    "/:_id",
    validations.users.update,
    middleware.auth,
    controllers.users.update
  )
  .delete(
    "/:_id",
    validations.users.delete,
    middleware.auth,
    controllers.users.remove
  );
