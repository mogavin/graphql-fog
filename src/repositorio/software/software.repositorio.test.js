const { assert } = require('chai'),
criarRepositorio = require('./index');

describe('Software Repositorio', () => {
  const DADOS = {
    1: {
      id: 1,
      nome: 'Game Maker VX',
      plataformas: ['Windows'],
      preco: 60.00,
    },
    2: {
      id: 2,
      nome: 'Fences',
      plataformas: ['Linux'],
      preco: 10.00,
    },
    3: {
      id: 3,
      nome: 'Start10',
      plataformas: ['macOs'],
      preco: 200.50,
    },
  };
  let db, repositorio;

  beforeEach(() => {
    db = {produtos: {...DADOS}};
    repositorio = criarRepositorio(db);
  });
  

  it('deve recuperar todos os softwares caso nenhuma query seja passada', () => {
    const esperado = [DADOS[1], DADOS[2], DADOS[3]],
    atual = repositorio.recuperarViaQuery();

    assert.deepEqual(atual, esperado);
  });

  it('deve recuperar um software pelo id', () => {
    const id = 1,
    esperado = DADOS[id],
    atual = repositorio.recuperarPeloId(id);

    assert.deepEqual(atual, esperado);
  });

  it('deve recuperar softwares por ids', () => {
    const ids = [1, 3],
    esperado = [DADOS[1], DADOS[3]],
    atual = repositorio.recuperarPorIds(ids);

    assert.deepEqual(atual, esperado);
  });

  it('deve salvar um novo software', () => {
    const softwaresNaBase = () => Object.values(db.produtos).length,
    novo = {
      nome: 'Rone',
      plataformas: ['Linux'],
    },
    salvo = repositorio.salvar(novo);

    assert.include(salvo, novo);
    assert.include(db.produtos[salvo.id], salvo);
    assert.equal(softwaresNaBase(), 4);
  });

  it('deve atualizar um software', () => {
    const idAlvo = 1,
    novoNome = 'GameMaker Studio 2 Desktop',
    esperado = {
      nome: novoNome,
      plataformas: ['Windows'],
    },
    atualizado = repositorio.atualizar(idAlvo, {nome: novoNome});

    assert.deepInclude(atualizado, esperado);
    assert.include(db.produtos[atualizado.id], atualizado);
  });

  it('deve remover um software', () => {
    const idAlvo = 2,
    esperado = {
      nome: 'Fences',
      plataformas: ['Linux'],
    },
    removido = repositorio.remover(idAlvo);

    assert.deepInclude(removido, esperado);
    assert.isNotOk(db.produtos[removido.id]);
  });

  it('deve adicionar uma nova plataforma', () => {
    const novaPlataforma = 'Linux',
    idAlvo = 3,
    esperado = {
      nome: 'Start10',
      plataformas: ['macOs', novaPlataforma],
    },
    atualizado = repositorio.addPlataforma(idAlvo, novaPlataforma);

    assert.deepInclude(atualizado, esperado);
    assert.include(db.produtos[atualizado.id], atualizado);
  });
});
