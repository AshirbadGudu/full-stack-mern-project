const mongoose = require("mongoose");
const configs = require("../configs");

// Connect to database
const connect = () => {
  mongoose.connect(configs.MONGO_URI, {
    /**
     * `useNewUrlParser` is a boolean option that tells Mongoose to use the new MongoDB driver's URL parser instead of the deprecated one.
     * This is necessary because the old parser is not compatible with certain MongoDB connection strings, and will generate a deprecation warning in the console.
     */
    useNewUrlParser: true,
    /**
     * `useUnifiedTopology` is another boolean option that tells Mongoose to use the new MongoDB driver's unified topology engine instead of the old one.
     * This is necessary because the old engine is being deprecated and will be removed in a future version of the MongoDB driver.
     */
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", () => console.log("MongoDB Ready to 🚀🚀🚀"));
};

module.exports = { connect };
