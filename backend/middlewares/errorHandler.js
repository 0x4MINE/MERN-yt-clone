export const errorHandler = (err, req, res, next) => {

  if (res.headersSent) {
    return next(err); 
  }

  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: err.message || "Internal Server Error",
  });
};
