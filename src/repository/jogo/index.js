const initialData = require('./data');

module.exports = (engine = []) => ({
  getWithQuery: query => engine,
  getById: id => engine[id - 1],
});
