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
  extended_description: {
    type: String,
    default: null
  },
  usages: {
    type: String,
    default: null
  },
  synonyms: {
    type: String,
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    default: Date.now()
  },
  is_anonymous: {
    type: Boolean,
    default: false
  },
  is_on_report_feed: {
    type: Boolean,
    default: false
  },
  tags: [
    {
      type: String,
      tagname: String
    }
  ],
  userId: { type: mongoose.ObjectId, ref: 'userProfile' },
  favoriters: [{ type: mongoose.ObjectId, ref: 'userProfile' }]
});

wordSchema.statics.toResponse = (word) => {
  const {
    id,
    wordname,
    meaning,
    extended_description,
    usages,
    synonyms,
    created_at,
    updated_at,
    is_anonymous,
    is_on_report_feed,
    tags,
    userId,
    favoriters
  } = word;
  return {
    id,
    wordname,
    meaning,
    extended_description,
    usages,
    synonyms,
    created_at,
    updated_at,
    is_anonymous,
    is_on_report_feed,
    tags,
    userId,
    favoriters
  };
};

const word = mongoose.model('words', wordSchema);

module.exports = word;
