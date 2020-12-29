const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
  },
  { timestamps: true },
  { versionKey: false }
);

userSchema.statics.toResponse = (user) => {
  const { id, username, email } = user;
  return { id, username, email };
};

const user = mongoose.model('users', userSchema);

module.exports = user;
