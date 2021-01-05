const word = require('./word.schema');

const createWord = async (data) => await word.create(data);

const getAllWords = async () => await word.find({});

const getWordById = async (id) => await word.findById(id);

const updateWord = async (id, data) =>
  await word.updateOne({ _id: id }, { ...data, updated_at: Date.now() });

module.exports = {
  createWord,
  getAllWords,
  getWordById,
  updateWord
};
