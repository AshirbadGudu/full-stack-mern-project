const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  return res.json({ message: "Server Running" });
});

app.listen(1333, () => console.log(`🚀🚀🚀 http://localhost:1333 🚀🚀🚀`));
