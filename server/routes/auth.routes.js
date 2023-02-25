const { check } = require("express-validator");
const controllers = require("../controllers");

require("express")
  .Router()
  .post(
    "/register",
    [
      check("email", "Please include a valid email").isEmail(),
      check(
        "password",
        "Please enter a password with 6 or more characters"
      ).isLength({ min: 6 }),
      check("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password)
          throw new Error("Password and Confirm Password Did Not Match");
        else return true;
      }),
    ],
    controllers.auth.register
  );
