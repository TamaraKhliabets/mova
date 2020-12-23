const User = require('./user.model');

class UsersController {
  // eslint-disable-next-line class-methods-use-this
  async getAllUsers(req, res) {
    console.log(res);
    if (!req.users) {
      return res.status(404).send({ message: 'Users not found.' });
    }
    return res.status(200).json(req.users.map(User.toResponse));
  }
}

module.exports = new UsersController();
