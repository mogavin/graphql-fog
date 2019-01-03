const criarRepositorioProduto = require('../produto'),
_db = require('../../db');

module.exports = (db = _db) => ({
  ...criarRepositorioProduto(db),
  addPlataforma: (id, plataforma) => {
    const alvo = db.produtos[id];
    alvo.plataformas.push(plataforma);
    return alvo;
  },
});
