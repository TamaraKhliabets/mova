const express = require('express');

const router = express.Router();

const userController = require('./user.controller');

router.route('/user').post(userController.registerUser); // REGISTER
router.route('/user/login').post(userController.loginUser);

module.exports = router;
