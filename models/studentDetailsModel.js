const mongoose = require("mongoose");
// Helper function to format timestamps
const formatTimestamp = (timestamp) => {
  return new Date(timestamp).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const studentDetailsModel = mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, "Enter student name"],
    },
    studentAge: {
      type: Number,
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
    createdAt: {
      type: String,
      default: () => formatTimestamp(Date.now()),
    },
    updatedAt: {
      type: String,
      default: () => formatTimestamp(Date.now()),
    },
  },
  {
    timestamps: false, // Enable automatic timestamps
  }
);

module.exports = mongoose.model("studentDetails_colls", studentDetailsModel);
