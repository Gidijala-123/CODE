const express = require("express");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");

const app = express();
const port = process.env.PORT || 9999;

// Middleware
app.use(express.json());

// Import routers and Swagger docs
const {
  router: studentSignUpRouter,
  swaggerSignUpDoc,
} = require("./routers/studentSignUpRouter");
const {
  router: studentDetailsRouter,
  swaggerDetailsDoc,
} = require("./routers/studentDetailsRouter");

// Swagger UI setup for StudentSignUp
app.use(
  "/swagger/studentSignUp",
  (req, res, next) => {
    req.swaggerDoc = swaggerSignUpDoc;
    next();
  },
  swaggerUi.serve,
  swaggerUi.setup(null, {
    swaggerOptions: { url: "/swagger/studentSignUp.json" },
  })
);

// Swagger UI setup for StudentDetails
app.use(
  "/swagger/studentDetails",
  (req, res, next) => {
    req.swaggerDoc = swaggerDetailsDoc;
    next();
  },
  swaggerUi.serve,
  swaggerUi.setup(null, {
    swaggerOptions: { url: "/swagger/studentDetails.json" },
  })
);

// Error handling middleware
const dbConnection = require("./configFile/dbConfig");
dbConnection();

const errorHandler = require("./middleware/errorHandling");
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  // console.log(
  //   `Swagger for StudentSignUp: http://localhost:${port}/swagger/studentSignUp`
  // );
  // console.log(
  //   `Swagger for StudentDetails: http://localhost:${port}/swagger/studentDetails`
  // );
});

// Use the routers
app.use("/api/studentSignUp", studentSignUpRouter);
app.use("/api/studentDetails", studentDetailsRouter);
