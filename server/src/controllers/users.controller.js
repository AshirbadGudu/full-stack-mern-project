const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const users = {
  get: async (_, res) => {
    try {
      const allUsers = await userModel.find({}, "-password -__v");
      // Send back success message
      return res.json({
        msg: "Success",
        isSuccess: true,
        data: { users: allUsers },
      });
    } catch (error) {
      // If any other error happens handle here
      const msg =
        error instanceof Error ? error.message : "Internal Server Error";
      return res.status(500).json({ msg, isSuccess: false });
    }
  },
  create: async (req, res) => {
    try {
      // Send back success message
      return res.json({
        msg: "Success",
        isSuccess: true,
      });
    } catch (error) {
      // If any other error happens handle here
      const msg =
        error instanceof Error ? error.message : "Internal Server Error";
      return res.status(500).json({ msg, isSuccess: false });
    }
  },
  update: async (req, res) => {
    try {
      // Send back success message
      return res.json({
        msg: "Success",
        isSuccess: true,
      });
    } catch (error) {
      // If any other error happens handle here
      const msg =
        error instanceof Error ? error.message : "Internal Server Error";
      return res.status(500).json({ msg, isSuccess: false });
    }
  },
  remove: async (req, res) => {
    try {
      // Send back success message
      return res.json({
        msg: "Success",
        isSuccess: true,
      });
    } catch (error) {
      // If any other error happens handle here
      const msg =
        error instanceof Error ? error.message : "Internal Server Error";
      return res.status(500).json({ msg, isSuccess: false });
    }
  },
};

module.exports = users;
