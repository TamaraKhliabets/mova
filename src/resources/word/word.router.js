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

module.exports = router;
