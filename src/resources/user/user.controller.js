const userModel = require('./user.model');
const User = require('./user.schema');

const { NotFound, UnprocessableEntity } = require('../../error');

const { catchErrors } = require('../../middlewares/errorMiddleware');
const { generateAccessTokenAndRefreshToken } = require('../../utils/security/jwt');

const registerUser = catchErrors(async (req, res) => {
  const { username: reqUsername, password: reqPassword, email: reqEmail } = req.body;

  if (
    (!reqUsername || !reqPassword || !reqEmail) &&
    req.body.constructor === Object &&
    Object.keys(req.body).length !== 0
  ) {
    throw new NotFound('Unable create user.');
  }

  const email = await userModel.findEmail(reqEmail);
  if (email) {
    throw new UnprocessableEntity('Email already registered');
  }

  const username = await userModel.findUserName(reqUsername);
  if (username) {
    throw new UnprocessableEntity('User already registered');
  }

  const newUser = await userModel.registerUser(req.body);

  const token = await generateAccessTokenAndRefreshToken(newUser);

  const result = User.toResponse(newUser);
  return res.status(200).json({ ...result, ...token });
});

const loginUser = catchErrors(async (req, res) => {
  const { username: reqUsername, password: reqPassword, email: reqEmail } = req.body;

  const toHaveEmail = await userModel.findEmail(reqEmail);
  if (!toHaveEmail) {
    throw new UnprocessableEntity('Authentication failed, email not found');
  }

  const toHaveUser = await userModel.findUserName(reqUsername);
  if (!toHaveUser) {
    throw new UnprocessableEntity('Authentication failed, user not found');
  }

  const isMatch = await User.comparePassword(reqPassword, toHaveUser.password);

  if (!isMatch) {
    return res.json({ loginSuccess: false, message: 'Wrong password' });
  }

  return res.json();
});

module.exports = {
  registerUser,
  loginUser
};
