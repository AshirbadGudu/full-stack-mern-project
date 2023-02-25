const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const { CONFIG } = require("./config");
const routes = require("./routes");

app.use(cors());
app.use(express.json());

mongoose
  .connect(`${CONFIG.MONGO_URI}`)
  .then(() => console.log("MongoDB Ready to 🚀🚀🚀"))
  .catch((e) => console.log("MongoDB Connection Error", e.message));

app.get("/", (_, res) => res.status(200).json({ msg: "Server Running" }));

app.use("/api/v1/auth", routes.auth);

app.listen(CONFIG.PORT, () =>
  console.log(`🚀🚀🚀 http://localhost:${CONFIG.PORT} 🚀🚀🚀`)
);
