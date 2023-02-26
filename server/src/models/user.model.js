const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter a email"],
      unique: true,
    },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    isVerified: { type: Boolean, default: false },
  },
  { collection: "USERS", timestamps: true }
);

module.exports = mongoose.model("user", User);
