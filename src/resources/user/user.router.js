const express = require('express');

const router = express.Router();

const userController = require('./user.controller');
const User = require('./user.schema');

// REGISTER
router.route('/user').post(async (req, res) => {
  const { username, password, email } = req.body;

  if (
    (!username || !password || !email) &&
    req.body.constructor === Object &&
    Object.keys(req.body).length !== 0
  ) {
    return res.status(400).send('Bad request');
  }

  const toHaveEmail = await userController.getEmails(email);
  // TODO LENGTH ?
  if (toHaveEmail) {
    return res.status(422).send({ message: 'Email already registered' });
  }

  const toHaveUser = await userController.getUserNames(username);
  if (toHaveUser) {
    return res.status(422).send({ message: 'User already registered' });
  }

  const newUser = await userController.addUser(req.body);
  return res.status(200).json(User.toResponse(newUser));
});

router.route('/user/login').post(async (req, res) => {
  const { username, email, password } = req.body;

  const toHaveEmail = await userController.getEmails(email);
  if (!toHaveEmail) {
    return res.status(422).send({ message: 'Authentication failed, email not found' });
  }

  const toHaveUser = await userController.getUserNames(username);
  if (!toHaveUser) {
    return res.status(422).send({ message: 'Authentication failed, user not found' });
  }

  const isMatch = await User.comparePassword(password, toHaveUser.password);

  if (!isMatch) {
    return res.json({ loginSuccess: false, message: 'Wrong password' });
  }

  const user = User.generateToken(toHaveUser);
  if (!user) {
    return res.status(400).send({ message: user });
  }

  // REFRESH/ACCESS TOKEN LOGIC

  return res.status(200).send(User.toResponse(user));
});

module.exports = router;
