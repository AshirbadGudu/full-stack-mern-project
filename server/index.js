const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const configs = require("./src/configs");
const routes = require("./src/routes");

app.use(cors());
app.use(express.json());

mongoose
  .connect(`${configs.MONGO_URI}`)
  .then(() => console.log("MongoDB Ready to 🚀🚀🚀"))
  .catch((e) => console.log("MongoDB Connection Error", e.message));

app.get("/", (_, res) => res.status(200).json({ msg: "Server Running" }));

app.use("/api/v1/auth", routes.auth);

app.listen(configs.PORT, () =>
  console.log(`🚀🚀🚀 http://localhost:${configs.PORT} 🚀🚀🚀`)
);
