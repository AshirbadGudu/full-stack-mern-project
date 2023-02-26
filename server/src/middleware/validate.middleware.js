const { validationResult } = require("express-validator");

const validate = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ msg: errors.array(), isSuccess: false });
    next();
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Validation Failed Server Error", isSuccess: false });
  }
};

module.exports = validate;
