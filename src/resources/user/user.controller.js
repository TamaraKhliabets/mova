const userModel = require('./user.model');
const User = require('./user.schema');

const { NotFound, UnprocessableEntity, BadRequest } = require('../../error');

const { catchErrors } = require('../../middlewares/errorMiddleware');
const {
  generateAccessTokenAndRefreshToken,
  getJwtValueByKey
} = require('../../utils/security/jwt');
const { comparePassword } = require('../../utils/security/hash');
const { getRetrievedBearerTokenFromRequest } = require('../../utils/security/http');

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

  // create token
  const token = await generateAccessTokenAndRefreshToken(newUser);

  const result = User.toResponse(newUser);
  return res.status(200).json({ ...result, ...token });
});

const loginUser = catchErrors(async (req, res) => {
  const { username: reqUsername, password: reqPassword, email: reqEmail } = req.body;

  // TODO Authentication for email or username ??????????????
  const email = await userModel.findEmail(reqEmail.toLowerCase());
  if (!email) {
    throw new UnprocessableEntity('Authentication failed, email not found');
  }

  const user = await userModel.findUserName(reqUsername);
  if (!user) {
    throw new UnprocessableEntity('Authentication failed, user not found');
  }

  // check if the password is valid
  const isMatch = await comparePassword(reqPassword, user.password);
  if (!isMatch) {
    throw new BadRequest('Wrong password');
  }

  // retrieve tokens
  const token = await generateAccessTokenAndRefreshToken(user);

  const result = User.toResponse(user);
  return res.status(200).json({ ...result, ...token });
});

// eslint-disable-next-line no-unused-vars
const getUser = catchErrors(async (req, res) => {
  const token = getRetrievedBearerTokenFromRequest(req);

  const userId = getJwtValueByKey(token, 'id');

  const user = await userModel.findId(userId);
  if (!user) {
    throw new NotFound(`User with the id ${userId} was not found`);
  }

  const result = User.toResponse(user);
  return res.status(200).json(result);
});

module.exports = {
  registerUser,
  loginUser,
  getUser
};
