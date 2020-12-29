const express = require('express');

const router = express.Router();

const userController = require('./user.controller');
const userModel = require('./user.model');
const user = require('./user.schema');

router.route('/users').get(async (req, res) => {
  const users = await userController.getAllUsers();

  if (!users) {
    return res.status(404).send({ message: 'Users not found.' });
  }
  return res.status(200).json(users.map(user.toResponse));
});

router.route('/user').post(async (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.email) return res.sendStatus(400);
  const emails = await userModel.getEmails(req.body.email);
  const usernames = await userModel.getUsernames(req.body.username);
  if (emails.length || usernames.length) {
    return res.status(422).send({ message: 'User already registered' });
  }
  const newUser = await userController.addUser(req.body);
  return res.json(user.toResponse(newUser));
});

module.exports = router;
