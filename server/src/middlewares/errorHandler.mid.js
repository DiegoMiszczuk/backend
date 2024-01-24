function errorHandler(error, req, res, next) {
  console.log(error);
  return res.status( error.statusCode || 500).json({
    status: error.statusCode || 500,
    message: `${req.method} ${req.url} ${error.message}`,
  });
}
export default errorHandler;
