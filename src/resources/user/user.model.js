const User = require('./user.schema');

const getAllUsers = async () => {
  return User.find({}).exec();
};

module.exports = {
  getAllUsers
};
