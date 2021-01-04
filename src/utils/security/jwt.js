const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');

const moment = require('moment');
const RefreshToken = require('../../resources/refreshToken/refreshToken.schema');

const { SECRET_JWT_KEY } = require('../../config');

const generateAccessTokenAndRefreshTokenForUser = async (user, jwtId) => {
  const refreshToken = new RefreshToken();

  // TODO we need connection by id or something (by populate) ?
  refreshToken.userId = user.id;
  refreshToken.jwtId = jwtId;

  // expiry 10 days
  refreshToken.expiryDate = moment().add(10, 'd').toDate();

  await refreshToken.save();
  return refreshToken.id;
};

const generateAccessTokenAndRefreshToken = async (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email
  };

  const jwtId = uuid();

  const accessToken = jwt.sign(payload, SECRET_JWT_KEY, {
    expiresIn: '1h',
    jwtid: jwtId, // needed for the refresh token, as a refresh token only points to one single unique token
    subject: user.id.toString() // the subject should be the users id (primary key)
  });

  const refreshToken = await generateAccessTokenAndRefreshTokenForUser(user, jwtId);

  return { accessToken, refreshToken };
};

module.exports = {
  generateAccessTokenAndRefreshToken
};
