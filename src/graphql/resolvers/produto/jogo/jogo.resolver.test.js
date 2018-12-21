const sinon = require('sinon'),
stub = sinon.stub,
resetarTodosStubs = sinon.reset,
{ assert } = require('chai'),
criarResolver = require('./index');

describe('Jogo Resolver', () => {
  const stubRepository = {
    recuperarPeloId: stub(),
    recuperarViaQuery: stub(),
    salvar: stub(),
    atualizar: stub(),
    remover: stub(),
  },
  resolver = criarResolver(stubRepository);

  beforeEach(() => resetarTodosStubs());

  it('deve recuperar todos os jogos', () => {
    const esperado = ['Jogo_1', 'Jogo_2'];

    stubRepository.recuperarViaQuery.returns(esperado)

    const atual = resolver.Query.jogos();

    assert.deepEqual(atual, esperado);
  });

  it('deve recuperar um jogo pelo id', () => {
    const id = 512,
    esperado = 'Jogo_1';

    stubRepository.recuperarPeloId.withArgs(id).returns(esperado)

    const atual = resolver.Query.jogo(null, {id});

    assert.deepEqual(atual, esperado);
  });

  it('deve criar um novo jogo', () => {
    const input = {titulo: 'Jogo input'},
    esperado = 'Jogo_salvo';

    stubRepository.salvar.withArgs(input).returns(esperado)

    const atual = resolver.Mutation.jogoCreate(null, {input});

    assert.deepEqual(atual, esperado);
  });

  it('deve atualizar um jogo', () => {
    const id = 3,
    input = {titulo: 'Novo titulo'},
    esperado = 'Jogo_atualizado';

    stubRepository.atualizar.withArgs(id, input).returns(esperado)

    const atual = resolver.Mutation.jogoUpdate(null, {id, input});

    assert.deepEqual(atual, esperado);
  });

  it('deve remover um jogo', () => {
    const id = 3,
    esperado = 'Jogo_removido';

    stubRepository.remover.withArgs(id).returns(esperado)

    const atual = resolver.Mutation.jogoRemove(null, {id});

    assert.deepEqual(atual, esperado);
  });
})
