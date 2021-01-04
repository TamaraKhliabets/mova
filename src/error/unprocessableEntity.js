const HttpError = require('./httpError');

class UnprocessableEntity extends HttpError {
  constructor(message) {
    super();
    this.statusCode = 401;
    this.message = message;
  }
}

module.exports = UnprocessableEntity;
