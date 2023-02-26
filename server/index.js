/**
 * Import external packages
 * */
const express = require("express");
const cors = require("cors");
const app = express();
/**
 * Import required files
 * */
const db = require("./src/db");
const configs = require("./src/configs");
const routes = require("./src/routes");
/**
 * Use required express middleware
 * */
app.use(cors());
app.use(express.json());
/**
 * Connect to database
 * */
db.connect();
/**
 * Setup the routes
 * */
app.use("/api/v1/auth", routes.auth);
app.use("/api/v1/users", routes.users);
/**
 * Listen to a specific port number
 * */
app.listen(configs.PORT, () =>
  console.log(`🚀🚀🚀 http://localhost:${configs.PORT} 🚀🚀🚀`)
);
