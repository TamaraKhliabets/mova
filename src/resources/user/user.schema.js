const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const moment = require('moment');

const saltRounds = 10;

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    createdAt: { type: String, default: moment().subtract(24, 'hours').toDate() },
    updatedAt: { type: String, default: moment().subtract(24, 'hours').toDate() },
    accessToken: { type: String, required: true }
  },
  { timestamps: true },
  { versionKey: false }
);

// eslint-disable-next-line func-names
userSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    user.password = await bcrypt.hash(user.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.statics.comparePassword = async (plainPassword, currentUserPassword) => {
  try {
    return await bcrypt.compare(plainPassword, currentUserPassword);
  } catch (err) {
    return err;
  }
};

userSchema.statics.toResponse = (user) => {
  const { id, username, email, createdAt, updatedAt, accessToken } = user;
  return { id, username, email, createdAt, updatedAt, accessToken };
};

const user = mongoose.model('users', userSchema);

module.exports = user;
