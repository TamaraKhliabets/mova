const wordModel = require('./word.model');

const createWord = async (data) => wordModel.createWord(data);

const getAllWords = async () => wordModel.getAllWords();

const getWordById = async (id) => wordModel.getWordById(id);

module.exports = {
  createWord,
  getAllWords,
  getWordById
};
