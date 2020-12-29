const userModel = require('./user.model');

const addUser = async (data) => userModel.addUser(data);
const getAllUsers = async () => userModel.getAllUsers();

module.exports = {
  addUser,
  getAllUsers
};
