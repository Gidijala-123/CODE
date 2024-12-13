const asyncHandler = require("express-async-handler"); // Middleware for handling exceptions inside of async express routes without using try catch
const jwt = require("jsonwebtoken"); // Library for generating and verifying JSON Web Tokens
const bcrypt = require("bcrypt"); // Library for hashing and comparing passwords
const studentSignUpModel = require("../models/studentSignUpModel"); // Importing the student model for database operations
require("dotenv").config(); // Loading environment variables from a .env file

// Custom validation middleware for registration
const validateRegistrationData = (req, res, next) => {
  const errors = [];
  const { studentName, studentMail, studentPassword } = req.body;

  // Validate studentName
  if (
    !studentName ||
    typeof studentName !== "string" ||
    studentName.length < 2 ||
    studentName.length > 50
  ) {
    errors.push("Student name must be a string between 2 and 50 characters.");
  }

  // Validate studentMail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!studentMail || !emailRegex.test(studentMail)) {
    errors.push("Provide a valid email address.");
  }

  // Validate studentPassword
  if (
    !studentPassword ||
    studentPassword.length < 6 ||
    studentPassword.length > 20
  ) {
    errors.push("Password must be between 6 and 20 characters.");
  }

  // Return errors if any
  if (errors.length > 0) {
    return res
      .status(400)
      .json({ Message: "Validation Error", Errors: errors });
  }

  next(); // Proceed if no validation errors
};

// Custom validation middleware for login
const validateLoginData = (req, res, next) => {
  const errors = [];
  const { studentMail, studentPassword } = req.body;

  // Validate studentMail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!studentMail || !emailRegex.test(studentMail)) {
    errors.push("Provide a valid email address.");
  }

  // Validate studentPassword
  if (
    !studentPassword ||
    studentPassword.length < 6 ||
    studentPassword.length > 20
  ) {
    errors.push("Password must be between 6 and 20 characters.");
  }

  // Return errors if any
  if (errors.length > 0) {
    return res
      .status(400)
      .json({ Message: "Validation Error", Errors: errors });
  }

  next(); // Proceed if no validation errors
};

// Student Registration
const studentRegistration = asyncHandler(async (req, res) => {
  const { studentName, studentMail, studentPassword } = req.body;

  // Check if a student with the provided email already exists
  const checkForExistingStudent = await studentSignUpModel.findOne({
    studentMail,
  });
  if (checkForExistingStudent) {
    return res.status(401).json({ Message: "Student already registered" });
  }

  // Hash the student's password before storing it in the database
  const hashedPassword = await bcrypt.hash(studentPassword, 10);

  // Create a new student record in the database
  const newStudent = await studentSignUpModel.create({
    studentName,
    studentMail,
    studentPassword: hashedPassword,
  });

  // Respond based on the success of the operation
  if (newStudent) {
    return res.status(201).json({ Message: "New student registered" });
  } else {
    return res.status(400).json({ Message: "Invalid details" });
  }
});

// Student Login
const studentLogin = asyncHandler(async (req, res) => {
  const { studentMail, studentPassword } = req.body;

  // Find the student by email in the database
  const studentFromDb = await studentSignUpModel.findOne({ studentMail });

  // Verify the provided password and generate a token if valid
  if (
    studentFromDb &&
    (await bcrypt.compare(studentPassword, studentFromDb.studentPassword))
  ) {
    const generateToken = jwt.sign(
      {
        tokenKey: {
          studentName: studentFromDb.studentName,
          studentMail: studentFromDb.studentMail,
          studentId: studentFromDb.id,
        },
      },
      process.env.ACCESS_TOKEN, // Secret key from environment variables
      { expiresIn: "30m" } // Token expiry time
    );

    // Respond with the generated token
    return res.status(200).json({ "AccessToken ": generateToken });
  } else {
    return res.status(401).json({ Messages: "Invalid credentials" });
  }
});

module.exports = {
  studentRegistration, // Exporting the registration function
  studentLogin, // Exporting the login function
  validateRegistrationData, // Exporting registration validation middleware
  validateLoginData, // Exporting login validation middleware
};
