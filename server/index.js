const express = require("express");
const mongoose = require("mongoose");
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
  return res.json({ message: "Server Running" });
});
app.post("/register", async (req, res) => {
  try {
    const email = req.body.email,
      password = req.body.password,
      confirmPassword = req.body.confirmPassword;

    const user = await new userModel({
      email,
      password,
      confirmPassword,
    }).save();

    return res.json({
      message: "Register Successful",
      isSuccess: true,
      data: user,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Can't complete register";
    return res.json({ message, isSuccess: false });
  }
});

app.listen(CONFIG.PORT, () =>
  console.log(`🚀🚀🚀 http://localhost:${CONFIG.PORT} 🚀🚀🚀`)
);
