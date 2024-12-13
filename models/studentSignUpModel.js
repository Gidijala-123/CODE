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

module.exports = mongoose.model("studentSignUp_colls", studentSignUpModel);
