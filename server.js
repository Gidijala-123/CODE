const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 9999;

app.listen(port, () => {
  console.log("Server running @ PORT :", port);
});

const dbConnection = require("./configFile/dbConfig");
dbConnection();

const errorHandler = require("./middleware/errorHandling");
app.use(errorHandler);

app.use(express.json());
app.use("/api/studentSignUp", require("./routers/studentSignUpRouter"));
app.use("/api/studentDetails", require("./routers/studentDetailsRouter"));
