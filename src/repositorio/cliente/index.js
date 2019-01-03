const criarRepositorioComum = require('../comum'),
_db = require('../../db');

module.exports = (db = _db) => {
  const comum = criarRepositorioComum(db, 'clientes');
  return {
    ...comum,
    salvar: ({listaDesejos = [], carrinhoCompras = [], ...restante}) => 
      comum.salvar({...restante, listaDesejos, carrinhoCompras}),
    addProdutosListaDesejos: (id, idsProdutos) => {
      const alvo = db.clientes[id];
      alvo.listaDesejos.push(...idsProdutos);
      return alvo;
    },
    addProdutosCarrinho: (id, idsProdutos) => {
      const alvo = db.clientes[id];
      alvo.carrinhoCompras.push(...idsProdutos);
      return alvo;
    },
  }
};
