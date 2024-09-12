const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGOD_URI || "mongodb://localhost:27017/beadshop"
);

module.exports = mongoose.connection;
