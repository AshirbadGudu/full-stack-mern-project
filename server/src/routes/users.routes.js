const controllers = require("../controllers");
const validations = require("../validations");
const middleware = require("../middleware");

module.exports = require("express")
  .Router()
  .get("/", controllers.users.get)
  .post("/", middleware.auth, controllers.users.create)
  .put("/:_id", middleware.auth, controllers.users.update)
  .delete("/:_id", middleware.auth, controllers.users.remove);
