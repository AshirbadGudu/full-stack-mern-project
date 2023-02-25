const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");

const auth = {
  register: async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ msg: errors.array(), isSuccess: false });
      // Extract email & password from req body
      const { email, password } = req.body;
      // Check the email already exist or not
      let user = await userModel.findOne({ email });
      if (user)
        return res
          .status(400)
          .json({ msg: "User already exists", isSuccess: false });
      // Create the user
      user = new userModel({ email });
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      // Save user inside database
      await user.save();
      // Send back success message
      return res.json({
        msg: "User registered successfully",
        isSuccess: true,
        data: user,
      });
    } catch (error) {
      // If any other error happens handle here
      const msg =
        error instanceof Error ? error.message : "Can't complete register";
      return res.status(500).json({ msg, isSuccess: false });
    }
  },
};

module.exports = auth;
