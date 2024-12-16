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
    hour12: true, // Enables 12-hour format with AM/PM
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
      default: () => formatTimestamp(Date.now()), // Initial formatting for createdAt
    },
    updatedAt: {
      type: String,
      default: () => formatTimestamp(Date.now()), // Initial formatting for updatedAt
    },
  },
  {
    timestamps: true, // Enable automatic timestamps (createdAt, updatedAt)
  }
);

// Middleware to format the updatedAt timestamp before saving
studentDetailsModel.pre("save", function (next) {
  if (this.isModified()) {
    this.updatedAt = formatTimestamp(Date.now()); // Update updatedAt whenever document is modified
  }
  next();
});

module.exports = mongoose.model("studentDetails_colls", studentDetailsModel);
