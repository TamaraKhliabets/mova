class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  let { statusCode, message } = err;
  if (!(err instanceof ErrorHandler)) {
    statusCode = 500;
    message = 'Internal Server Error';
  }

  res.status(statusCode).send(message);
  return { statusCode, message };
};

const catchErrors = (fn) => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  ErrorHandler,
  handleError,
  catchErrors
};
