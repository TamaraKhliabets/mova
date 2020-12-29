const user = require('./user.schema');

const getEmails = async (email) => {
  return user.find({ email }).exec();
};

const getUsernames = async (username) => {
  return user.find({ username }).exec();
};

const addUser = async (data) => {
  return user.create(data);
};

const getAllUsers = async () => {
  return user.find({}).exec();
};

module.exports = {
  getEmails,
  getUsernames,
  addUser,
  getAllUsers
};
