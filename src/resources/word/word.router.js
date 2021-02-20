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

module.exports = router;
