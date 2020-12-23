const UserRepo = require('./user.db.repository');

class UsersService {
  // eslint-disable-next-line class-methods-use-this
  async getAllUsers() {
    return UserRepo.getAllUsers();
  }
}

module.exports = new UsersService();
