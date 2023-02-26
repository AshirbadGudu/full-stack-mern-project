require("dotenv").config();

const configs = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 1335,
  JWT_SECRET: process.env.JWT_SECRET,
};

module.exports = configs;
