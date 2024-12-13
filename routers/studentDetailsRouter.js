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
