const express = require("express");
const router = express.Router();

const {
  studentRegistration,
  studentLogin,
} = require("../controllers/studentSignUpController");

router
  .post("/studentRegistration", studentRegistration)
  .post("/studentLogin", studentLogin);

module.exports = router;
