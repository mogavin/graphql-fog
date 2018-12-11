const jogosList = require('./data');

module.exports = {
  getWithQuery: query => jogosList,
  getById: id => jogosList[id - 1],
}
