const wordModel = require('./word.model');

const createWord = async (data) => wordModel.createWord(data);

module.exports = {
  createWord
};
