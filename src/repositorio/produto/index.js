const criarRepositorioComum = require('../comum'),
_db = require('../../db');

module.exports = (db = _db) => ({
  ...criarRepositorioComum(db, 'produtos'),
  recuperarPorIds: ids =>
    ids.reduce((resp, id) =>
      db.produtos[id] ?resp.concat(db.produtos[id]) :resp
    , []),
});
