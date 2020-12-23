const User = require('./user.model');

class UsersRepo {
  // eslint-disable-next-line class-methods-use-this
  async getAllUsers() {
    return User.find().exec();
  }
}

module.exports = new UsersRepo();
