const user = require('./user.schema');

const getAllUsers = async () => {
  return user.find({}).exec();
};

module.exports = {
  getAllUsers
};
