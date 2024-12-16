const express = require("express");
const router = express.Router();
require("dotenv").config();

const {
  studentRegistration,
  studentLogin,
} = require("../controllers/studentSignUpController");

// Swagger Document
const swaggerSignUpDoc = {
  openapi: "3.0.0",
  info: {
    title: "Student Management API - Sign Up",
    version: "1.0.0",
    description: "API for student registration and login",
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT}`, // Adjust this URL based on your actual server port
    },
  ],
  components: {
    schemas: {
      StudentSignUp: {
        type: "object",
        properties: {
          studentName: { type: "string" },
          studentMail: { type: "string" },
          studentPassword: { type: "string" },
        },
      },
    },
  },
  paths: {
    "/api/studentSignUp/studentRegistration": {
      post: {
        summary: "Register a new student",
        tags: ["StudentSignUp"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/StudentSignUp",
              },
            },
          },
        },
        responses: {
          201: { description: "Student registered successfully" },
          400: { description: "Validation error" },
        },
      },
    },
    "/api/studentSignUp/studentLogin": {
      post: {
        summary: "Login a student",
        tags: ["StudentSignUp"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/StudentSignUp",
              },
            },
          },
        },
        responses: {
          200: { description: "Student logged in successfully" },
          401: { description: "Unauthorized" },
        },
      },
    },
  },
};

// Routes
router
  .post("/studentRegistration", studentRegistration)
  .post("/studentLogin", studentLogin);

module.exports = { router, swaggerSignUpDoc };
