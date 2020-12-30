const profileModel = require('./profile.model');

const getUserByUsername = async (username) => profileModel.getUserByUsername(username);

const getProfileById = async (userId) => profileModel.getProfileById(userId);

module.exports = {
  getUserByUsername,
  getProfileById
};
