const word = require('./word.schema');

const createWord = async (data) => await word.create(data);

module.exports = {
  createWord
};
