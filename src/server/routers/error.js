const notFound = (req, res, next) => {
  res.status(404);
  res.render('error', {
    title: '404 Not Found',
    message: 'Not Found'
  });
};

const internalServerError = (err, req, res, next) => {
  res.status(500);
  res.render('error', {
    title: '500 Internal Server Error',
    message: 'Please try again later.'
  });
};

export default { notFound, internalServerError };
