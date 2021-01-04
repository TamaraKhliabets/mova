const express = require('express');

const router = express.Router();

const userController = require('./user.controller');

router.route('/user').post(userController.registerUser).get(userController.getUser);
router.route('/user/login').post(userController.loginUser);

module.exports = router;
