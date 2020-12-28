const wordModel = require('./word.model');

const createWord = async (data) => wordModel.createWord(data);

const getAllWords = async () => wordModel.getAllWords();

module.exports = {
  createWord,
  getAllWords
};
