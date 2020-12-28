const router = require('express').Router();

const wordController = require('./word.controller');
const { catchErrors } = require('../../middleware/catchErrors');

// api - для всего?
router.route('/word').post(
  catchErrors(async (req, res) => {
    const word = await wordController.createWord(req.body);
    return res.status(200).json({ word: word });
  })
);

router.route('/word').get(
  catchErrors(async (_, res) => {
    const words = await wordController.getAllWords();
    return res.status(200).json({ words });
  })
);

module.exports = router;
