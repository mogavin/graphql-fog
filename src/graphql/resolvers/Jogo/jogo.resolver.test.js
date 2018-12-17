const sinon = require('sinon'),
stub = sinon.stub,
resetarTodosStubs = sinon.reset,
{ assert } = require('chai'),
criarResolver = require('./index');

describe('Jogo Resolver', () => {
  const stubRepository = {
    recuperarPeloId: stub(),
    recuperarViaQuery: stub(),
  },
  resolver = criarResolver(stubRepository);

  beforeEach(() => resetarTodosStubs());

  it('deve recuperar todos os jogos', () => {
    const expected = ['Game_1', 'Game_2'];

    stubRepository.recuperarViaQuery.returns(expected)

    const actual = resolver.Query.jogos();

    assert.deepEqual(actual, expected);
  });

   it('deve recuperar um jogo pelo id', () => {
    const id = 512,
    expected = 'Game_1';

    stubRepository.recuperarPeloId.withArgs(id).returns(expected)

    const actual = resolver.Query.jogo(null, {id});

    assert.deepEqual(actual, expected);
  });
})
