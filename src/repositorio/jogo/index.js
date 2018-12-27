const criarRepositorioComum = require('../comum'),
_db = require('../../db');

module.exports = (db = _db) => ({
  ...criarRepositorioComum(db, 'jogos'),
  recuperarPorIds: ids =>
    ids.reduce((resp, id) =>
      db.jogos[id] ?resp.concat(db.jogos[id]) :resp
    , []),
});
