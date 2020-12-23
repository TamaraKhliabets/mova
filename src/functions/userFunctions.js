const keys = [
  "id",
  "username",
  "email",
  "bio",
  "image",
  "email_verified",
  "refresh_token",
  "access_token"
];

const serializeUser = user => {
  return keys.reduce((obj, key) => {
    if (user && user.hasOwnProperty(key)) {
      obj[key] = user[key];
    }
    return obj;
  }, {});
};

module.exports = { serializeUser };
