const user = require('./user.schema');

const findEmail = async (email) => {
  return user.findOne({ email }).exec();
};

const findUserName = async (username) => {
  return user.findOne({ username }).exec();
};

const registerUser = async (data) => {
  return user.create(data);
};

module.exports = {
  findUserName,
  findEmail,
  registerUser
};
