const jwt = require('jsonwebtoken');
const userModel = require('./user.model');

const addUser = async (data) => {
  const accessToken = jwt.sign(data, '123');
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  return userModel.addUser({ ...data, accessToken });
};
const getAllUsers = async () => userModel.getAllUsers();

module.exports = {
  addUser,
  getAllUsers
};
