const profileModel = require('./profile.model');

const getUserByUsername = async (username) => profileModel.getUserByUsername(username);

const createProfile = async (userId) => profileModel.createProfile(userId);

module.exports = {
  getUserByUsername,
  createProfile
};
