const sinon = require('sinon'),
stub = sinon.stub,
resetarTodosStubs = sinon.reset,
{ assert } = require('chai'),
criarResolver = require('./index');

describe('Cliente Resolver', () => {
  const stubRepository = {
    recuperarPeloId: stub(),
    recuperarViaQuery: stub(),
    salvar: stub(),
    atualizar: stub(),
    remover: stub(),
    addProdutosListaDesejos: stub(),
    addProdutosCarrinho: stub(),
  },
  resolver = criarResolver(stubRepository);

  beforeEach(() => resetarTodosStubs());

  it('deve recuperar todos os clientes', () => {
    const esperado = ['Cliente_1', 'Cliente_2'];

    stubRepository.recuperarViaQuery.returns(esperado)

    const atual = resolver.Query.clientes();

    assert.deepEqual(atual, esperado);
  });

  it('deve recuperar um cliente pelo id', () => {
    const id = 512,
    esperado = 'Cliente_1';

    stubRepository.recuperarPeloId.withArgs(id).returns(esperado)

    const atual = resolver.Query.cliente(null, {id});

    assert.deepEqual(atual, esperado);
  });

  it('deve criar um novo cliente', () => {
    const input = {titulo: 'Cliente input'},
    esperado = 'Cliente_salvo';

    stubRepository.salvar.withArgs(input).returns(esperado)

    const atual = resolver.Mutation.clienteCreate(null, {input});

    assert.deepEqual(atual, esperado);
  });

  it('deve atualizar um cliente', () => {
    const id = 3,
    input = {titulo: 'Novo titulo'},
    esperado = 'Cliente_atualizado';

    stubRepository.atualizar.withArgs(id, input).returns(esperado)

    const atual = resolver.Mutation.clienteUpdate(null, {id, input});

    assert.deepEqual(atual, esperado);
  });

  it('deve remover um cliente', () => {
    const id = 3,
    esperado = 'Cliente_removido';

    stubRepository.remover.withArgs(id).returns(esperado)

    const atual = resolver.Mutation.clienteRemove(null, {id});

    assert.deepEqual(atual, esperado);
  });

  it('deve adicionar novos produtos na lista de desejos de um cliente', () => {
    const idCliente = 3,
    idsProdutos = [501, 784],
    esperado = 'Lista_desejos_atualizada';

    stubRepository.addProdutosListaDesejos.withArgs(idCliente, idsProdutos).returns(esperado)

    const atual = resolver.Mutation.clienteAddProdutosListaDesejos(null, {idCliente, idsProdutos});

    assert.deepEqual(atual, esperado);
  });

  it('deve adicionar novos produtos no carrinho de compras de um cliente', () => {
    const idCliente = 3,
    idsProdutos = [501, 784],
    esperado = 'Carrinho_compras_atualizado';

    stubRepository.addProdutosCarrinho.withArgs(idCliente, idsProdutos).returns(esperado)

    const atual = resolver.Mutation.clienteAddProdutosCarrinho(null, {idCliente, idsProdutos});

    assert.deepEqual(atual, esperado);
  });
})
