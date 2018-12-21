const criarResolverComum = require('../../comum')('cliente'),
_repositorio = require('../../../../repositorio/cliente')();

module.exports = (repositorio = _repositorio) => {
  const resolverComum = criarResolverComum(repositorio);
  return {
    ...resolverComum,
    Mutation: {
      ...resolverComum.Mutation,
      clienteAddProdutosListaDesejos: (root, {idCliente, idsProdutos}) => 
        repositorio.addProdutosListaDesejos(idCliente, idsProdutos),
      clienteAddProdutosCarrinho: (root, {idCliente, idsProdutos}) => 
        repositorio.addProdutosCarrinho(idCliente, idsProdutos),
    }
  };
};
