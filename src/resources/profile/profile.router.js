const express = require('express');

const router = express.Router();

const profileSchema = require('./profile.schema');
const profileController = require('./profile.conroller');

const { catchErrors } = require('../../middlewares/errorMiddleware');

router.route('/:username').get(
  catchErrors(async (req, res) => {
    const { username } = req.params;
    const user = await profileController.getUserByUsername(username);

    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    const { id } = user;
    const profile = await profileController.getProfileById(id);
    return res.status(200).json(profileSchema.toResponse(profile));
  })
);

router
  .route('/:username/follow')
  .post(
    catchErrors(async (req, res) => {
      const { username } = req.params;
      const user = await profileController.getUserByUsername(username);

      if (!user) {
        return res.status(404).send({ message: 'User not found.' });
      }

      const { id } = user;
      const profile = await profileController.addFollower(id, req.body);

      if (!profile) {
        return res.status(404).send({ message: 'Follower not found.' });
      }

      const updatedProfile = await profileController.getProfileById(id);

      return res.status(200).json(profileSchema.toResponse(updatedProfile));
    })
  )
  .delete(
    catchErrors(async (req, res) => {
      const { username } = req.params;
      const user = await profileController.getUserByUsername(username);

      if (!user) {
        return res.status(404).send({ message: 'User not found.' });
      }

      const { id } = user;
      const profile = await profileController.deleteFollower(id, req.body);

      if (!profile) {
        return res.status(404).send({ message: 'Follower not found.' });
      }

      return res.status(200).json({ message: 'Follower successfully deleted.' });
    })
  );

module.exports = router;
