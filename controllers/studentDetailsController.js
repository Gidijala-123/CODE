const asyncHandler = require("express-async-handler");
const studentDetailsModel = require("../models/studentDetailsModel");
require("dotenv").config();

// Create student details
const createStudentDetails = asyncHandler(async (req, res) => {
  const {
    studentName,
    studentAge,
    studentClass,
    studentSection,
    studentRollNo,
  } = req.body;

  const newStudentDetails = await studentDetailsModel.create({
    studentName,
    studentAge,
    studentClass,
    studentSection,
    studentRollNo,
  });
  console.log(`New student created successfully ${newStudentDetails}`);
  return res.status(201).json(newStudentDetails);
});

// Fetch all student details with pagination
const getAllStudentDetails = asyncHandler(async (req, res) => {
  // Extract page and limit from query parameters
  let { page = 1, limit = 10 } = req.query;
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
    return res
      .status(400)
      .json({ Message: "Invalid page or limit parameters." });
  }
  // Calculate the number of documents to skip
  const skip = (page - 1) * limit;
  // Fetch the student details with pagination
  const [allStudents, totalStudents] = await Promise.all([
    studentDetailsModel.find({}).skip(skip).limit(limit), // Paginated students
    studentDetailsModel.countDocuments(), // Total count of students
  ]);
  // If no students found
  if (allStudents.length === 0) {
    return res.status(404).json({ Message: "No students found." });
  }
  // Return paginated result
  return res.status(200).json({
    Current_Page: page,
    Total_Students: totalStudents,
    Total_Pages: Math.ceil(totalStudents / limit),
    Students_Per_Page: limit,
    Students: allStudents,
  });
});

// Fetch student details by ID
const getStudentDetailsById = asyncHandler(async (req, res) => {
  const findById = await studentDetailsModel.findById(req.params.id);
  if (findById) {
    return res.status(200).json(findById);
  }
  return res.status(404).json({ Message: "Student not found..!" });
});

// Update student details by ID
const updateStudentDetailsById = asyncHandler(async (req, res) => {
  const findById = await studentDetailsModel.findById(req.params.id);
  if (!findById) {
    return res.status(404).json({ Error: "Student not found" });
  }

  const updatedStudent = await studentDetailsModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  return res.status(201).json({
    Message: `Student ${findById.studentName} details updated successfully`,
    Data: updatedStudent,
  });
});

// Delete student details by ID
const deleteStudentDetailsById = asyncHandler(async (req, res) => {
  const findByIdAndDelete = await studentDetailsModel.findById(req.params.id);
  if (!findByIdAndDelete) {
    return res.status(404).json({ Message: "Student not found" });
  }
  await studentDetailsModel.deleteOne(findByIdAndDelete);
  return res.status(200).json({
    Message: `Student ${findByIdAndDelete.studentName} deleted successfully`,
  });
});

module.exports = {
  createStudentDetails,
  getAllStudentDetails,
  getStudentDetailsById,
  updateStudentDetailsById,
  deleteStudentDetailsById,
};
