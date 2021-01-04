const wordModel = require('./word.model');

const createWord = async (data) => wordModel.createWord(data);

const getAllWords = async () => wordModel.getAllWords();

const getWordById = async (id) => wordModel.getWordById(id);

const updateWord = async (id, data) => wordModel.updateWord(id, data);

const deleteWord = async (id) => wordModel.deleteWord(id);

module.exports = {
  createWord,
  getAllWords,
  getWordById,
  updateWord,
  deleteWord
};
