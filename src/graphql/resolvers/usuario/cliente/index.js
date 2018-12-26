const criarResolverComum = require('../../comum')('cliente'),
_clienteRepositorio = require('../../../../repositorio/cliente')(),
_jogoRepositorio = require('../../../../repositorio/jogo')();

module.exports = ({
  clienteRepositorio = _clienteRepositorio, 
  produtoRepositorio = _jogoRepositorio,
} = {}) => {
  const resolverComum = criarResolverComum(clienteRepositorio);
  return {
    ...resolverComum,
    Mutation: {
      ...resolverComum.Mutation,
      clienteAddProdutosListaDesejos: (root, {idCliente, idsProdutos}) => 
        clienteRepositorio.addProdutosListaDesejos(idCliente, idsProdutos),
      clienteAddProdutosCarrinho: (root, {idCliente, idsProdutos}) => 
        clienteRepositorio.addProdutosCarrinho(idCliente, idsProdutos),
    },
    Cliente: {
      listaDesejos: ({listaDesejos}) => produtoRepositorio.recuperarPorIds(listaDesejos),
      carrinhoCompras: ({carrinhoCompras}) => produtoRepositorio.recuperarPorIds(carrinhoCompras),
    },
  };
};
