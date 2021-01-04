const jwt = require('jsonwebtoken');
const userModel = require('./user.model');

const addUser = async (data) => {
  const accessToken = jwt.sign(data, '123');
  return userModel.addUser({ ...data, accessToken });
};

const getEmails = async (email) => userModel.getEmails(email);

const getUserNames = async (username) => userModel.getUserNames(username);

module.exports = {
  addUser,
  getEmails,
  getUserNames
};
