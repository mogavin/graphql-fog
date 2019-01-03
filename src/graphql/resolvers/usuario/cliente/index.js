const criarResolverComum = require('../../comum')('cliente'),
_clienteRepositorio = require('../../../../repositorio/cliente')(),
_produtoRepositorio = require('../../../../repositorio/produto')();

module.exports = ({
  clienteRepositorio = _clienteRepositorio, 
  produtoRepositorio = _produtoRepositorio,
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
      listaDesejos: ({listaDesejos: idsProdutos}) => produtoRepositorio.recuperarPorIds(idsProdutos),
      carrinhoCompras: ({carrinhoCompras: idsProdutos}) => produtoRepositorio.recuperarPorIds(idsProdutos),
    },
    CarrinhoCompras: {
      produtos: carrinhoCliente => carrinhoCliente,
      total: carrinhoCliente => carrinhoCliente.reduce((total, {preco}) => 
        (total + preco)
      , 0),
    }
  };
};
