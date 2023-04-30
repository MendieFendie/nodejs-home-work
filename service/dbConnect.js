require("dotenv").config();
const mongoose = require("mongoose");

const URIDB = process.env.URIDB;

async function connection() {
  await mongoose.connect(URIDB, {
    useUnifiedTopology: true,
  });
  console.log("Database connection successful");
}

module.exports = connection;
