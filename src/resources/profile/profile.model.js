const userSchema = require('../user/user.schema');
const profileSchema = require('./profile.schema');

const getUserByUsername = async (username) => {
  return userSchema.findOne({ username: username.toString() }).exec();
};

const getProfileById = async (userId) => {
  return profileSchema.findOne({ user_id: userId }).exec();
};

module.exports = {
  getUserByUsername,
  getProfileById
};
