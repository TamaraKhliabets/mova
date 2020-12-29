const router = require('express').Router();

const wordController = require('./word.controller');
const { catchErrors } = require('../../middleware/catchErrors');

// api - для всего?
router.route('/word').post(
  catchErrors(async (req, res) => {
    const word = await wordController.createWord(req.body);
    return res.status(200).json({ word });
  })
);

router.route('/word').get(
  catchErrors(async (_, res) => {
    const words = await wordController.getAllWords();
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

    return res.status(200).json({ word: word });
  })
);

module.exports = router;
