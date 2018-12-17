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
    atualizar: stub()
  },
  resolver = criarResolver(stubRepository);

  beforeEach(() => resetarTodosStubs());

  it('deve recuperar todos os jogos', () => {
    const expected = ['Jogo_1', 'Jogo_2'];

    stubRepository.recuperarViaQuery.returns(expected)

    const actual = resolver.Query.jogos();

    assert.deepEqual(actual, expected);
  });

  it('deve recuperar um jogo pelo id', () => {
    const id = 512,
    expected = 'Jogo_1';

    stubRepository.recuperarPeloId.withArgs(id).returns(expected)

    const actual = resolver.Query.jogo(null, {id});

    assert.deepEqual(actual, expected);
  });

  it('deve criar um novo jogo', () => {
    const novo = {titulo: 'Jogo novo'},
    expected = 'Jogo_salvo';

    stubRepository.salvar.withArgs(novo).returns(expected)

    const actual = resolver.Mutation.jogoCreate(null, novo);

    assert.deepEqual(actual, expected);
  });

  it('deve atualizar um jogo', () => {
    const id = 3,
    data = {titulo: 'Novo titulo'},
    expected = 'Jogo_atualizado';

    stubRepository.atualizar.withArgs(id, data).returns(expected)

    const actual = resolver.Mutation.jogoUpdate(null, {id, data});

    assert.deepEqual(actual, expected);
  });
})
