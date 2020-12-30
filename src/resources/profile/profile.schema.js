const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: String,
    //   required: true
    // },
    role: { type: String, default: 'USER_ROLE' },
    user_id: {},
    follows: {}
  },
  { versionKey: false }
);

profileSchema.statics.toResponse = (profile) => {
  const { role, user_id: userId, follows } = profile;
  return { role, userId, follows };
};

const profile = mongoose.model('profiles', profileSchema);

module.exports = profile;
