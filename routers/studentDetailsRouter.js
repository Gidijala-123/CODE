const express = require("express");
const router = express.Router();
const validateStudentsData = require("../middleware/validateStudentsData");
const {
  createStudentDetails,
  getAllStudentDetails,
  getStudentDetailsById,
  updateStudentDetailsById,
  deleteStudentDetailsById,
} = require("../controllers/studentDetailsController");

const validateToken = require("../middleware/validateToken");

/**
 * @swagger
 * tags:
 *   name: StudentDetails
 *   description: API for managing student details
 */

/**
 * @swagger
 * /api/studentDetails/createStudentDetails:
 *   post:
 *     summary: Create a new student
 *     tags: [StudentDetails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentName:
 *                 type: string
 *               studentAge:
 *                 type: number
 *               studentClass:
 *                 type: string
 *               studentSection:
 *                 type: string
 *               studentRollNo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Student created successfully
 */

/**
 * @swagger
 * /api/studentDetails/getAllStudentDetails:
 *   get:
 *     summary: Get all students with pagination
 *     tags: [StudentDetails]
 *     parameters:
 *       - name: Page
 *         in: query
 *         description: Page number
 *         required: false
 *         schema:
 *           type: integer
 *       - name: Limit
 *         in: query
 *         description: Number of students per page
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of students
 */

/**
 * @swagger
 * /api/studentDetails/getStudentDetailsById/{id}:
 *   get:
 *     summary: Get a student by ID
 *     tags: [StudentDetails]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student details retrieved successfully
 *       404:
 *         description: Student not found
 */

/**
 * @swagger
 * /api/studentDetails/updateStudentDetailsById/{id}:
 *   put:
 *     summary: Update a student by ID
 *     tags: [StudentDetails]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Student updated successfully
 *       404:
 *         description: Student not found
 */

/**
 * @swagger
 * /api/studentDetails/deleteStudentDetailsById/{id}:
 *   delete:
 *     summary: Delete a student by ID
 *     tags: [StudentDetails]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 */

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

module.exports = router;
