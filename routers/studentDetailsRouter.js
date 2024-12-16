const express = require("express");
const router = express.Router();
require("dotenv").config();

const validateStudentsData = require("../middleware/validateStudentsData");
const validateToken = require("../middleware/validateToken");
const {
  createStudentDetails,
  getAllStudentDetails,
  getStudentDetailsById,
  updateStudentDetailsById,
  deleteStudentDetailsById,
} = require("../controllers/studentDetailsController");

// Swagger Document
const swaggerDetailsDoc = {
  openapi: "3.0.0",
  info: {
    title: "Student Management API - Details",
    version: "1.0.0",
    description: "API for managing student details",
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT}`, // Adjust this URL based on your actual server port
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
    },
    schemas: {
      Student: {
        type: "object",
        properties: {
          studentName: { type: "string" },
          studentAge: { type: "number" },
          studentClass: { type: "string" },
          studentSection: { type: "string" },
          studentRollNo: { type: "string" },
        },
      },
    },
  },
  paths: {
    "/api/studentDetails/createStudentDetails": {
      post: {
        summary: "Create a new student",
        tags: ["StudentDetails"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Student",
              },
            },
          },
        },
        responses: { 201: { description: "Student created successfully" } },
      },
    },
    "/api/studentDetails/getAllStudentDetails": {
      get: {
        summary: "Get all students with pagination",
        tags: ["StudentDetails"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "Page",
            in: "query",
            description: "Page number",
            schema: { type: "integer" },
          },
          {
            name: "Limit",
            in: "query",
            description: "Students per page",
            schema: { type: "integer" },
          },
        ],
        responses: { 200: { description: "List of students" } },
      },
    },
    "/api/studentDetails/getStudentDetailsById/{id}": {
      get: {
        summary: "Get a student by ID",
        tags: ["StudentDetails"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: { 200: { description: "Student retrieved successfully" } },
      },
    },
    "/api/studentDetails/updateStudentDetailsById/{id}": {
      put: {
        summary: "Update a student by ID",
        tags: ["StudentDetails"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Student",
              },
            },
          },
        },
        responses: { 201: { description: "Student updated successfully" } },
      },
    },
    "/api/studentDetails/deleteStudentDetailsById/{id}": {
      delete: {
        summary: "Delete a student by ID",
        tags: ["StudentDetails"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: { 200: { description: "Student deleted successfully" } },
      },
    },
  },
};

// Routes
router
  .post(
    "/createStudentDetails",
    validateToken,
    validateStudentsData,
    createStudentDetails
  )
  .get("/getAllStudentDetails", validateToken, getAllStudentDetails)
  .get("/getStudentDetailsById/:id", validateToken, getStudentDetailsById)
  .put(
    "/updateStudentDetailsById/:id",
    validateToken,
    validateStudentsData,
    updateStudentDetailsById
  )
  .delete(
    "/deleteStudentDetailsById/:id",
    validateToken,
    deleteStudentDetailsById
  );

module.exports = { router, swaggerDetailsDoc };
