const criarRepositorioComum = require('../comum'),
_db = [];

module.exports = (db = _db) => ({
  ...criarRepositorioComum(db),
  addProdutoListaDesejos: (id, idProduto) => {
    const idAlvo = id - 1,
    alvo = db[idAlvo];
    alvo.listaDesejos.push(idProduto);
    return alvo;
  },
  addProdutoCarrinho: (id, idProduto) => {
    const idAlvo = id - 1,
    alvo = db[idAlvo];
    alvo.carrinhoCompras.push(idProduto);
    return alvo;
  },
});
