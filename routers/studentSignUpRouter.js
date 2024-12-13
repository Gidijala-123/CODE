const express = require("express");
const router = express.Router();

const {
  studentRegistration,
  studentLogin,
} = require("../controllers/studentSignUpController");

/**
 * @swagger
 * tags:
 *   name: StudentSignUp
 *   description: API for student registration and login
 */

/**
 * @swagger
 * /api/studentSignUp/studentRegistration:
 *   post:
 *     summary: Register a new student
 *     tags: [StudentSignUp]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Student registered successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/studentSignUp/studentLogin:
 *   post:
 *     summary: Login a student
 *     tags: [StudentSignUp]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student logged in successfully
 *       401:
 *         description: Unauthorized
 */

router
  .post("/studentRegistration", studentRegistration)
  .post("/studentLogin", studentLogin);

module.exports = router;
