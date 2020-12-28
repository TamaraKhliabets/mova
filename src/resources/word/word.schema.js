const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  wordname: {
    type: String,
    required: true,
    createIndexes: {
      unique: true
    }
  },
  meaning: {
    type: String,
    required: true
  },
  extended_description: String,
  usages: String,
  synonyms: String,
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    default: Date.now()
  },
  is_anonymous: Boolean,
  is_on_report_feed: Boolean,
  userId: { type: mongoose.ObjectId, ref: 'users' },
  tags: [
    {
      type: String,
      tagname: String,
      default: []
    }
  ]
});

const word = mongoose.model('words', wordSchema);

module.exports = word;
