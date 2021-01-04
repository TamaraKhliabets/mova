const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    role: { type: String, default: 'USER_ROLE' },
    user_id: { type: String },
    follows: []
  },
  { versionKey: false }
);

profileSchema.statics.toResponse = (profile) => {
  const { role, user_id, follows } = profile;
  return { role, user_id, follows };
};

const Profile = mongoose.model('Profiles', profileSchema);

module.exports = Profile;
