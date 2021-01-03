const user = require('./user.schema');

const getEmails = async (email) => {
  return user.findOne({ email }).exec();
};

const getUserNames = async (username) => {
  return user.findOne({ username }).exec();
};

const addUser = async (data) => {
  return user.create(data);
};

module.exports = {
  getEmails,
  getUserNames,
  addUser
};
