const sinon = require('sinon'),
stub = sinon.stub,
resetarTodosStubs = sinon.reset,
{ assert } = require('chai'),
criarResolver = require('./index');

describe('Cliente Resolver', () => {
  const stubClienteRepositorio = {
    recuperarPeloId: stub(),
    recuperarViaQuery: stub(),
    salvar: stub(),
    atualizar: stub(),
    remover: stub(),
    listaDesejos: stub(),
    carrinhoCompras: stub(),
    addProdutosListaDesejos: stub(),
    addProdutosCarrinho: stub(),
  },
  stubProdutoRepositorio = {
    recuperarPorIds: stub(),    
  },
  resolver = criarResolver({
    clienteRepositorio: stubClienteRepositorio,
    produtoRepositorio: stubProdutoRepositorio,
  });

  beforeEach(() => resetarTodosStubs());

  it('deve recuperar todos os clientes', () => {
    const esperado = ['Cliente_1', 'Cliente_2'];

    stubClienteRepositorio.recuperarViaQuery.returns(esperado)

    const atual = resolver.Query.clientes();

    assert.deepEqual(atual, esperado);
  });

  it('deve recuperar um cliente pelo id', () => {
    const id = 512,
    esperado = 'Cliente_1';

    stubClienteRepositorio.recuperarPeloId.withArgs(id).returns(esperado)

    const atual = resolver.Query.cliente(null, {id});

    assert.deepEqual(atual, esperado);
  });

  it('deve criar um novo cliente', () => {
    const input = {titulo: 'Cliente input'},
    esperado = 'Cliente_salvo';

    stubClienteRepositorio.salvar.withArgs(input).returns(esperado)

    const atual = resolver.Mutation.clienteCreate(null, {input});

    assert.deepEqual(atual, esperado);
  });

  it('deve atualizar um cliente', () => {
    const id = 3,
    input = {titulo: 'Novo titulo'},
    esperado = 'Cliente_atualizado';

    stubClienteRepositorio.atualizar.withArgs(id, input).returns(esperado)

    const atual = resolver.Mutation.clienteUpdate(null, {id, input});

    assert.deepEqual(atual, esperado);
  });

  it('deve remover um cliente', () => {
    const id = 3,
    esperado = 'Cliente_removido';

    stubClienteRepositorio.remover.withArgs(id).returns(esperado)

    const atual = resolver.Mutation.clienteRemove(null, {id});

    assert.deepEqual(atual, esperado);
  });

  it('deve adicionar novos produtos na lista de desejos de um cliente', () => {
    const idCliente = 3,
    idsProdutos = [501, 784],
    esperado = 'Lista_desejos_atualizada';

    stubClienteRepositorio.addProdutosListaDesejos.withArgs(idCliente, idsProdutos).returns(esperado)

    const atual = resolver.Mutation.clienteAddProdutosListaDesejos(null, {idCliente, idsProdutos});

    assert.deepEqual(atual, esperado);
  });

  it('deve adicionar novos produtos no carrinho de compras de um cliente', () => {
    const idCliente = 3,
    idsProdutos = [501, 784],
    esperado = 'Carrinho_compras_atualizado';

    stubClienteRepositorio.addProdutosCarrinho.withArgs(idCliente, idsProdutos).returns(esperado)

    const atual = resolver.Mutation.clienteAddProdutosCarrinho(null, {idCliente, idsProdutos});

    assert.deepEqual(atual, esperado);
  });

  it('deve retornar produtos da lista de desejos de um cliente', () => {
    const listaDesejos = [501, 784],
    cliente = {
      listaDesejos,
    },
    esperado = ['Produto_1, Produto_2'];

    stubProdutoRepositorio.recuperarPorIds.withArgs(listaDesejos).returns(esperado)

    const atual = resolver.Cliente.listaDesejos(cliente);

    assert.deepEqual(atual, esperado);
  });

  it('deve retornar carrinho de compras de um cliente', () => {
    const carrinhoCompras = [501, 784],
    cliente = {
      carrinhoCompras,
    },
    esperado = ['Produto_1'];

    stubProdutoRepositorio.recuperarPorIds.withArgs(carrinhoCompras).returns(esperado)

    const atual = resolver.Cliente.carrinhoCompras(cliente);

    assert.deepEqual(atual, esperado);
  });

  it('deve retornar produtos do carrinho de compras de um cliente', () => {
    const esperado = ['Produto_1', 'Produto_2'];

    const atual = resolver.CarrinhoCompras.produtos(esperado);

    assert.deepEqual(atual, esperado);
  });

  it('deve retornar o total do carrinho de compras de um cliente', () => {
    const carrinhoCliente = [
      {
        preco: 200,
      },
      {
        preco: 300,
      },
    ],
    esperado = 500;

    const atual = resolver.CarrinhoCompras.total(carrinhoCliente);

    assert.deepEqual(atual, esperado);
  });
})
