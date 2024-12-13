const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 9999;

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Student Management API",
      version: "1.0.0",
      description: "API for managing student details",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./routers/*.js", "./controllers/*.js"], // Paths to files with Swagger comments
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
const dbConnection = require("./configFile/dbConfig");
const errorHandler = require("./middleware/errorHandling");
app.use(express.json());
app.use(errorHandler);

// Routes
app.use("/api/studentSignUp", require("./routers/studentSignUpRouter"));
app.use("/api/studentDetails", require("./routers/studentDetailsRouter"));

// Start server
app.listen(port, () => {
  console.log("Server running @ PORT :", port);
});
dbConnection();
