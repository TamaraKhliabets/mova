const express = require('express');

const router = express.Router();

const profileSchema = require('./profile.schema');
const profileController = require('./profile.conroller');

router.route('/:username').get(async (req, res) => {
  const { username } = req.params;
  const user = await profileController.getUserByUsername(username);

  if (!user) {
    return res.status(404).send({ message: 'User not found.' });
  }

  const { id } = user;
  const profile = await profileController.getProfileById(id);
  return res.status(200).json(profileSchema.toResponse(profile));
});

router.route('/:username/follow').post(async (req, res) => {
  const { username } = req.params;
  const user = await profileController.getUserByUsername(username);

  if (!user) {
    return res.status(404).send({ message: 'User not found.' });
  }

  const { id } = user;
  const profile = await profileController.addFollower(id, req.body);
  if (!profile) {
    return res.status(404).send({ message: 'Profile not found.' });
  }

  const updatedProfile = await profileController.getProfileById(id);

  return res.status(200).json(profileSchema.toResponse(updatedProfile));
});

module.exports = router;
