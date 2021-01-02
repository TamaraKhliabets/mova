const router = require('express').Router();

const wordController = require('./word.controller');
const wordSchema = require('./word.schema');

const { catchErrors } = require('../../middleware/catchErrors');

router.route('/word').post(
  catchErrors(async (req, res) => {
    const word = await wordController.createWord(req.body);
    return res.status(200).json(wordSchema.toResponse(word));
  })
);

router.route('/word').get(
  catchErrors(async (_, res) => {
    const words = await wordController.getAllWords();

    if (!words) {
      return res.status(404).send({ message: 'Words not found.' });
    }

    return res.status(200).json({ words });
  })
);

router.route('/word/:id').get(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const word = await wordController.getWordById(id);

    if (!word) {
      return res.status(404).send({ message: 'Word not found.' });
    }

    return res.status(200).json({ word });
  })
);

module.exports = router;
