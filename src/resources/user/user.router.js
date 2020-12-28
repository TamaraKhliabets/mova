const express = require('express');

const router = express.Router();

const userController = require('./user.controller');
const userSchema = require('./user.schema');

router.route('/').get(async (req, res) => {
  const users = await userController.getAllUsers();

  if (!users) {
    return res.status(404).send({ message: 'Users not found.' });
  }
  return res.status(200).json(users.map(userSchema.toResponse));
});

module.exports = router;
