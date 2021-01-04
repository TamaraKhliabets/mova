const jwt = require('jsonwebtoken');

const { v4: uuid } = require('uuid');

const { SECRET_JWT_KEY } = require('../../config');

const generateAccessTokenAndRefreshToken = async (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email
  };

  const jwtId = uuid();

  const token = jwt.sign(payload, SECRET_JWT_KEY, {
    expiresIn: '1h',
    jwtid: jwtId, // needed for the refresh token, as a refresh token only points to one single unique token
    subject: user.id.toString() // the subject should be the users id (primary key)
  });

  return { token };
};

module.exports = {
  generateAccessTokenAndRefreshToken
};
