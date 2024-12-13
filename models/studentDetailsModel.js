const mongoose = require("mongoose");

const studentDetailsModel = mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, "Enter student name"],
    },
    studentAge: {
      type: String,
      required: [true, "Enter student age"],
    },
    studentClass: {
      type: String,
      required: [true, "Enter student class"],
    },
    studentSection: {
      type: String,
      required: [true, "Enter student section"],
    },
    studentRollNo: {
      type: String,
      required: [true, "Enter student rollno"],
    },
    // studentPhoto: {
    //   type: String,
    //   required: [true,"Provide student photo"],
    // },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

module.exports = mongoose.model("studentDetails_colls", studentDetailsModel);