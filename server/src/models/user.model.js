const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
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

UserSchema.pre("save", async function (next) {
  // trim the email before saving so that we get rid of extra spaces
  this.email = this.email.trim();
  // hash password before saving to database
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("user", UserSchema);
