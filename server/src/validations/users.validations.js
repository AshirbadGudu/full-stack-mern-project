const { param, body } = require("express-validator");

module.exports = {
  create: [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please provide a valid email address")
      .normalizeEmail(), // used for removing extra spaces, converting the domain part to lowercase, and removing dots
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    // Check if the role is valid
    body("role")
      .optional()
      .isIn(["admin", "user"])
      .withMessage("Role can only be either admin or user"),
    // Check if the isVerified is a boolean
    body("isVerified")
      .optional()
      .isBoolean()
      .withMessage("Invalid verification status"),
  ],
  update: [
    // Check if the id is provided in the param or not
    param("id").notEmpty().withMessage("ID is required."),
    // Check if the email is provided and is a valid email
    body("email")
      .optional()
      .isEmail()
      .normalizeEmail()
      .withMessage("Please provide a valid email address"),
    // Check if the password is provided and meets the minimum length criteria
    body("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    // Check if the role is valid
    body("role")
      .optional()
      .isIn(["admin", "user"])
      .withMessage("Role can only be either admin or user"),
    // Check if the isVerified is a boolean
    body("isVerified")
      .optional()
      .isBoolean()
      .withMessage("Invalid verification status"),
  ],
  delete: [
    // Check if the id is provided in the param or not
    param("id").notEmpty().withMessage("ID is required."),
  ],
};
