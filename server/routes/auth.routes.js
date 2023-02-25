const controllers = require("../controllers");
const validations = require("../validations");

module.exports = require("express")
  .Router()
  .post("/register", validations.auth.register, controllers.auth.register);
