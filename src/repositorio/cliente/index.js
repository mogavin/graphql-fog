const criarRepositorioComum = require('../comum'),
_db = require('../../db');

module.exports = (db = _db) => ({
  ...criarRepositorioComum(db, 'clientes'),
  addProdutosListaDesejos: (id, idsProdutos) => {
    const alvo = db.clientes[id];
    alvo.listaDesejos.push(...idsProdutos);
    return alvo;
  },
  addProdutosCarrinho: (id, idsProdutos) => {
    alvo = db.clientes[id];
    alvo.carrinhoCompras.push(...idsProdutos);
    return alvo;
  },
});
