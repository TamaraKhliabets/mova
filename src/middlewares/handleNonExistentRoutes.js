const { ErrorHandler } = require('../config/error');

/* eslint no-unused-vars: "off" */
const handleNonExistentRoutes = (req, res, next) => {
  throw new ErrorHandler(404, 'Not Found');
};

module.exports = handleNonExistentRoutes;
