const sinon = require('sinon'),
stub = sinon.stub,
resetarTodosStubs = sinon.reset,
{ assert } = require('chai'),
criarResolver = require('./index');

describe('Software Resolver', () => {
  const stubRepository = {
    recuperarPeloId: stub(),
    recuperarViaQuery: stub(),
    salvar: stub(),
    atualizar: stub(),
    remover: stub(),
    addPlataforma: stub(),
  },
  resolver = criarResolver(stubRepository);

  beforeEach(() => resetarTodosStubs());

  it('deve recuperar todos os softwares', () => {
    const esperado = ['Software_1', 'Software_2'];

    stubRepository.recuperarViaQuery.returns(esperado)

    const atual = resolver.Query.softwares();

    assert.deepEqual(atual, esperado);
  });

  it('deve recuperar um software pelo id', () => {
    const id = 512,
    esperado = 'Software_1';

    stubRepository.recuperarPeloId.withArgs(id).returns(esperado)

    const atual = resolver.Query.software(null, {id});

    assert.deepEqual(atual, esperado);
  });

  it('deve criar um novo software', () => {
    const input = {nome: 'Software input'},
    esperado = 'Software_salvo';

    stubRepository.salvar.withArgs(input).returns(esperado)

    const atual = resolver.Mutation.softwareCreate(null, {input});

    assert.deepEqual(atual, esperado);
  });

  it('deve atualizar um software', () => {
    const id = 3,
    input = {nome: 'Novo nome'},
    esperado = 'Software_atualizado';

    stubRepository.atualizar.withArgs(id, input).returns(esperado)

    const atual = resolver.Mutation.softwareUpdate(null, {id, input});

    assert.deepEqual(atual, esperado);
  });

  it('deve remover um software', () => {
    const id = 3,
    esperado = 'Software_removido';

    stubRepository.remover.withArgs(id).returns(esperado)

    const atual = resolver.Mutation.softwareRemove(null, {id});

    assert.deepEqual(atual, esperado);
  });

  it('deve adicionar uma plataforma', () => {
    const plataforma = 'Linux',
    id = 2,
    esperado = 'Plataforma_adicionada';

    stubRepository.addPlataforma.withArgs(id, plataforma).returns(esperado)

    const atual = resolver.Mutation.softwareAddPlataforma(null, {id, plataforma});

    assert.deepEqual(atual, esperado);
  });
})
