const controllers = require("../controllers");
const validations = require("../validations");

module.exports = require("express")
  .Router()
  .get("/currentUser", controllers.auth.currentUser)
  .post("/register", validations.auth.register, controllers.auth.register)
  .post("/login", validations.auth.login, controllers.auth.login);
