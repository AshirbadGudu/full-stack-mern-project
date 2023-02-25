const express = require("express");
const mongoose = require("mongoose");
const { validationResult, check } = require("express-validator");
const cors = require("cors");
const app = express();
const { CONFIG } = require("./config");
const userModel = require("./models/user.model");
app.use(cors());
app.use(express.json());

mongoose
  .connect(`${CONFIG.MONGO_URI}`)
  .then(() => console.log("MongoDB Ready to 🚀🚀🚀"))
  .catch((e) => console.log("MongoDB Connection Error", e.message));

app.get("/", (req, res) => {
  return res.json({ msg: "Server Running" });
});
app.post(
  "/register",
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
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ msg: errors.array(), isSuccess: false });
      // Extract everything from req body
      const { email, password, confirmPassword } = req.body;
      // Check the email already exist or not
      let user = await userModel.findOne({ email });
      if (user)
        return res
          .status(400)
          .json({ msg: "User already exists", isSuccess: false });
      // Create the user and save it inside database
      user = await new userModel({
        email,
        password,
        confirmPassword,
      }).save();
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
  }
);

app.listen(CONFIG.PORT, () =>
  console.log(`🚀🚀🚀 http://localhost:${CONFIG.PORT} 🚀🚀🚀`)
);
