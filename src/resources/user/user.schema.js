const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: String, required: false },
    updatedAt: { type: String, required: false },
    accessToken: { type: String, required: true }
  },
  { timestamps: true },
  { versionKey: false }
);

userSchema.statics.toResponse = (user) => {
  const { id, username, email, createdAt, updatedAt, accessToken } = user;
  return { id, username, email, createdAt, updatedAt, accessToken };
};

const user = mongoose.model('users', userSchema);

module.exports = user;
