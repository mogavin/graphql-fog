const _repositorio = require('../../../../repositorio/cliente')();

module.exports = ({
    recuperarViaQuery, 
    recuperarPeloId, 
    salvar, 
    atualizar, 
    remover,
    addProdutosListaDesejos,
    addProdutosCarrinho,
} = _repositorio) => ({
  Query: {
    cliente: (root, {id}) => recuperarPeloId(id),
    clientes: () => recuperarViaQuery(),
  },
  Mutation: {
    clienteCreate: (root, {input}) => salvar(input),
    clienteUpdate: (root, {id, input}) => atualizar(id, input),
    clienteRemove: (root, {id}) => remover(id),
    clienteAddProdutosListaDesejos: (root, {idCliente, idsProdutos}) => 
      addProdutosListaDesejos(idCliente, idsProdutos),
    clienteAddProdutosCarrinho: (root, {idCliente, idsProdutos}) => 
      addProdutosCarrinho(idCliente, idsProdutos),
  }
});
