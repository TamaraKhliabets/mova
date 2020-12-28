const userModel = require('./user.model');

const getAllUsers = async () => userModel.getAllUsers();

module.exports = {
  getAllUsers
};
