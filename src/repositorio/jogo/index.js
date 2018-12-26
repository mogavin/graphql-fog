const criarRepositorioComum = require('../comum'),
_db = [];

module.exports = (db = _db) => ({
  ...criarRepositorioComum(db),
  recuperarPorIds: ids => db.filter(({id}) => ids.includes(id)),
});
