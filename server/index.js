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
const { setupRoutes } = require("./src/helpers");
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
setupRoutes(app);
/**
 * Listen to a specific port number
 * */
app.listen(configs.PORT, () =>
  console.log(`🚀🚀🚀 http://localhost:${configs.PORT} 🚀🚀🚀`)
);
