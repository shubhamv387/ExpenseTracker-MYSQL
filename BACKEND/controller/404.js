exports.error = (req, res, next) => {
  res.status(400).send("<h1>Page not found!</h1>");
};
