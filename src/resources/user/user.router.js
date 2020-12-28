const express = require('express');

const router = express.Router();

const UserController = require('./user.controller');
const UserSchema = require('./user.schema');

router.route('/').get(async (req, res) => {
  const users = await UserController.getAllUsers();
  console.log(users);

  if (!users) {
    return res.status(404).send({ message: 'Users not found.' });
  }
  return res.status(200).json(users.map(UserSchema.toResponse));
});

module.exports = router;
