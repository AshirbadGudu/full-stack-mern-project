const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ message: "Server Running" });
});
app.post("/register", (req, res) => {
  console.log(req.body);
  return res.json({ message: "Register Successful" });
});

app.listen(1333, () => console.log(`🚀🚀🚀 http://localhost:1333 🚀🚀🚀`));
