const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
require("dotenv").config();

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decodedKey) => {
      if (err) {
        return res.status(401).json({ Message: "User not authorized" });
      }
      req.tokenKey = decodedKey.tokenKey;
      next();
    });
    if (!token) {
      return res.status(400).json({ Message: "Invalid token" });
    }
  } else {
    res.status(401).json({ Message: "Authentication Required" });
  }
});

module.exports = validateToken;
