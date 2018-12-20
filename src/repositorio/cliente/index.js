const criarRepositorioComum = require('../comum'),
_db = [];

module.exports = (db = _db) => ({
  ...criarRepositorioComum(db),
  addProdutosListaDesejos: (id, idsProdutos) => {
    const idAlvo = id - 1,
    alvo = db[idAlvo];
    alvo.listaDesejos.push(...idsProdutos);
    return alvo;
  },
  addProdutosCarrinho: (id, idsProdutos) => {
    const idAlvo = id - 1,
    alvo = db[idAlvo];
    alvo.carrinhoCompras.push(...idsProdutos);
    return alvo;
  },
});
