const word = require('./word.schema');

const createWord = async (data) => await word.create(data);

const getAllWords = async () => await word.find({});

const getWordById = async (id) => await word.findById(id);

module.exports = {
  createWord,
  getAllWords,
  getWordById
};
