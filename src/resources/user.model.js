const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true
    },
    username: { type: String, required: true, createIndexes: { unique: true } },
    email: { type: String, required: true, createIndexes: { unique: true } },
    password: { type: String, required: true }
  },
  { versionKey: false }
);

userSchema.statics.toResponse = (user) => {
  console.log(user);
  const { id, username, email } = user;
  return { id, username, email };
};

const User = mongoose.model('users', userSchema);

module.exports = User;
