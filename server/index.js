const express = require("express");
const mongoose = require("mongoose");
const { check } = require("express-validator");
const cors = require("cors");
const app = express();
const { CONFIG } = require("./config");
const controllers = require("./controllers");

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
  controllers.auth.register
);

app.listen(CONFIG.PORT, () =>
  console.log(`🚀🚀🚀 http://localhost:${CONFIG.PORT} 🚀🚀🚀`)
);
