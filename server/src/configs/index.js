require("dotenv").config();

const configs = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 1335,
};

module.exports = configs;
