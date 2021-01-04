const word = require('./word.schema');

const createWord = async (data) => await word.create(data);

const getAllWords = async () => await word.find({});

module.exports = {
  createWord,
  getAllWords
};
