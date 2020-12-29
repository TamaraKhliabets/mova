const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: String, required: false },
    updatedAt: { type: String, required: false }
  },
  { timestamps: true },
  { versionKey: false }
);

userSchema.statics.toResponse = (user) => {
  const { id, username, email, createdAt, updatedAt } = user;
  return { id, username, email, createdAt, updatedAt };
};

const user = mongoose.model('users', userSchema);

module.exports = user;
