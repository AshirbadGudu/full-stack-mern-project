const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    collection: "USERS",
  }
);

module.exports = mongoose.model("user", User);
