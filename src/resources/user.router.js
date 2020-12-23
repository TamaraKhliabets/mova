const express = require('express');

const router = express.Router();
const UsersController = require('./user.controller');
const UsersService = require('./user.service');

router.use(async (req, res, next) => {
  const usersData = await UsersService.getAllUsers();
  if (usersData) {
    req.users = usersData;
    // eslint-disable-next-line callback-return
    next();
  }
  return res.status(500).send({ message: 'Error while getting users' });
});

router.route('/').get(UsersController.getAllUsers);

module.exports = router;
