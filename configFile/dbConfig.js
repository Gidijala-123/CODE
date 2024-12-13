const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
  const connectionString = process.env.CONNECTION_STRING;
  try {
    const dbConn = await mongoose.connect(connectionString);
    console.log("\nDB Connection Successful..!");
    console.log("DB Name :", dbConn.connection.name + "\n");
  } catch (err) {
    console.log("Error connecting to DB..!", err);
  }
};

module.exports = dbConnection;
