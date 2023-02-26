const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const configs = require("../configs");

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
      // Create the user & save user inside database
      user = await new userModel({ email, password }).save();
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
  login: async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ msg: errors.array(), isSuccess: false });
      // Extract email & password from req body
      const { email, password } = req.body;
      // Check the email already exist or not
      let user = await userModel.findOne({ email });
      if (!user)
        return res.status(400).json({
          msg: "No user found with this email address",
          isSuccess: false,
        });
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res
          .status(400)
          .json({ msg: "Password does not match", isSuccess: false });
      // Create access token with jwt
      const accessToken = jwt.sign(
        { email, _id: user._id },
        configs.JWT_SECRET
      );
      // Send back success message
      return res.json({
        msg: "Login successful",
        isSuccess: true,
        data: { accessToken, user },
      });
    } catch (error) {
      // If any other error happens handle here
      const msg =
        error instanceof Error
          ? error.message
          : "Can't login with these credentials";
      return res.status(500).json({ msg, isSuccess: false });
    }
  },
  currentUser: async (req, res) => {
    try {
      // From auth middleware we get the current user information
      const { user } = req;
      // Send back success message
      res.status(200).json({
        msg: "User fetched successfully",
        isSuccess: true,
        data: { user },
      });
    } catch (error) {
      // If any other error happens handle here
      const msg =
        error instanceof Error ? error.message : "Can't get current user data";
      return res.status(500).json({ msg, isSuccess: false });
    }
  },
};

module.exports = auth;
