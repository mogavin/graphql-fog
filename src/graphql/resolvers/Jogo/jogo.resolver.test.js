const sinon = require('sinon'),
stub = sinon.stub,
resetAllStubs = sinon.reset,
{ assert } = require('chai'),
createResolver = require('./index');

describe('Jogo Resolver', () => {
  const stubRepository = {
    getById: stub(),
    getWithQuery: stub(),
  },
  resolver = createResolver(stubRepository);

  beforeEach(() => resetAllStubs());

  it('deve recuperar todos os jogos', () => {
    const expected = ['Game_1', 'Game_2'];

    stubRepository.getWithQuery.returns(expected)

    const actual = resolver.Query.jogos();

    assert.deepEqual(actual, expected);
  });

   it('deve recuperar um jogo pelo id', () => {
    const id = 512,
    expected = 'Game_1';

    stubRepository.getById.withArgs(id).returns(expected)

    const actual = resolver.Query.jogo(null, {id});

    assert.deepEqual(actual, expected);
  });
})
