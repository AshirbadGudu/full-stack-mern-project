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
  getOne: async (req, res) => {
    try {
      const user = await userModel.findById(req.params._id, "-password -__v");
      if (!user) return res.status(404).json({ message: "User not found" });
      // Send back success message
      return res.json({
        msg: "Success",
        isSuccess: true,
        data: { user },
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
      const { email, password, role, isVerified } = req.body;
      const user = await new userModel({
        email,
        password,
        role,
        isVerified,
      }).save();
      // Send back success message
      return res.json({
        msg: "Success",
        isSuccess: true,
        data: { user },
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
      const { email, password, role, isVerified } = req.body;
      const user = await userModel.findByIdAndUpdate(
        req.params._id,
        { email, password, role, isVerified },
        { new: true } // if we pass the { new: true } option, it returns the updated document instead of the old document
      );
      if (!user) return res.status(404).json({ message: "User not found" });
      // Send back success message
      return res.json({
        msg: "Success",
        isSuccess: true,
        data: { user },
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
      const user = await userModel.findByIdAndDelete(req.params._id);
      if (!user) return res.status(404).json({ message: "User not found" });
      // Send back success message
      return res.json({
        msg: "Success",
        isSuccess: true,
        data: { user },
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
