const express = require('express');

const router = express.Router();

const profileSchema = require('./profile.schema');
const profileController = require('./profile.conroller');

router.route('/:username').get(async (req, res) => {
  const { username } = req.params;
  const user = await profileController.getUserByUsername(username);

  if (!user) {
    return res.status(404).send({ message: 'Users not found.' });
    // create profile
  }
  const { _id: id } = user;
  const profile = await profileController.getProfileById(id);
  return res.status(200).json(profileSchema.toResponse(profile));
});

module.exports = router;
