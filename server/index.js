const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const { CONFIG } = require("./config");
app.use(cors());
app.use(express.json());

mongoose
  .connect(`${CONFIG.MONGO_URI}`)
  .then(() => console.log("MongoDB Ready to 🚀🚀🚀"))
  .catch((e) => console.log("MongoDB Connection Error", e.message));

app.get("/", (req, res) => {
  return res.json({ message: "Server Running" });
});
app.post("/register", (req, res) => {
  console.log(req.body);
  return res.json({ message: "Register Successful" });
});

app.listen(CONFIG.PORT, () =>
  console.log(`🚀🚀🚀 http://localhost:${CONFIG.PORT} 🚀🚀🚀`)
);
