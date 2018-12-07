const pagamentosList = require('./data');

module.exports = {
  getWithQuery: query => pagamentosList,
  getById: id => pagamentosList[id - 1],
}
