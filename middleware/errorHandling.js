const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Error",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized access",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden entry",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "Server error",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    default:
      res.status(500).json({
        title: "Unknown Error",
        message: "An unknown error occurred.",
        stackTrace: err.stackTrace,
      });
      break;
  }
};

module.exports = errorHandler;
