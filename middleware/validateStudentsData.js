// Custom validation middleware
const validateStudentsData = (req, res, next) => {
  const errors = [];
  const {
    studentName,
    studentAge,
    studentClass,
    studentSection,
    studentRollNo,
  } = req.body;
  // Validate studentName
  if (
    !studentName ||
    typeof studentName !== "string" ||
    studentName.length < 2 ||
    studentName.length > 50
  ) {
    errors.push("Student name must be a string between 2 and 50 characters.");
  }
  // Validate studentAge
  const age = parseInt(studentAge, 10);
  if (!studentAge || isNaN(age) || age < 5 || age > 100) {
    errors.push("Student age must be a number between 5 and 100.");
  }
  // Validate studentClass
  if (
    !studentClass ||
    typeof studentClass !== "string" ||
    studentClass.length < 1 ||
    studentClass.length > 10
  ) {
    errors.push("Student class must be a string between 1 and 10 characters.");
  }
  // Validate studentSection
  if (
    !studentSection ||
    typeof studentSection !== "string" ||
    studentSection.length < 1 ||
    studentSection.length > 5
  ) {
    errors.push("Student section must be a string between 1 and 5 characters.");
  }
  // Validate studentRollNo
  if (
    !studentRollNo ||
    typeof studentRollNo !== "string" ||
    !/^[A-Za-z0-9]+$/.test(studentRollNo)
  ) {
    errors.push("Student roll number must be alphanumeric.");
  }
  // Return errors if any
  if (errors.length > 0) {
    return res
      .status(400)
      .json({ Message: "Validation Error", Errors: errors });
  }
  next(); // Proceed if no validation errors
};

module.exports = validateStudentsData;
