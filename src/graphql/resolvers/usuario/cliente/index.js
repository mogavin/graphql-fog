const resolverComum = require('../../comum')('cliente'),
_repositorio = require('../../../../repositorio/cliente')();

module.exports = (repositorio = _repositorio) => {
  const {Query: QueryComum, Mutation: MutationComum} = resolverComum(repositorio);
  return {
    Query: QueryComum,
    Mutation: {
      ...MutationComum,
      clienteAddProdutosListaDesejos: (root, {idCliente, idsProdutos}) => 
        repositorio.addProdutosListaDesejos(idCliente, idsProdutos),
      clienteAddProdutosCarrinho: (root, {idCliente, idsProdutos}) => 
        repositorio.addProdutosCarrinho(idCliente, idsProdutos),
    }
  };
};
