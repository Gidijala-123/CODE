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

const studentSignUpModel = mongoose.Schema(
  {
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
    createdAt: {
      type: String,
      default: () => formatTimestamp(Date.now()), // Initial formatting
    },
    updatedAt: {
      type: String,
      default: () => formatTimestamp(Date.now()), // Initial formatting
    },
  },
  {
    timestamps: true, // Enable automatic timestamps (createdAt, updatedAt)
  }
);

// Middleware to update updatedAt timestamp before saving
studentSignUpModel.pre("save", function (next) {
  if (this.isModified()) {
    this.updatedAt = formatTimestamp(Date.now()); // Update updatedAt field with formatted timestamp
  }
  next();
});

module.exports = mongoose.model("studentSignUp_colls", studentSignUpModel);
