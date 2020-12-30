const userSchema = require('../user/user.schema');
const profileSchema = require('./profile.schema');

const getUserByUsername = async (username) => {
  return userSchema.findOne({ username: username.toString() }).exec();
};

const createProfile = async (userId) => {
  return profileSchema.create({ user_id: userId });
};

module.exports = {
  getUserByUsername,
  createProfile
};
