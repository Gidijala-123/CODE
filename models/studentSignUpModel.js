const mongoose = require("mongoose");

const studentSignUpModel = mongoose.Schema({
  studentName: {
    type: String,
    required: [true, "Enter student name"],
  },
  studentMail: {
    type: String,
    required: [true, "Enter student mail"],
  },
  studentPassword: {
    type: String,
    required: [true, "Enter student password"],
  },
});

module.exports = mongoose.model("studentSignUp_colls", studentSignUpModel);
