const { assert } = require('chai'),
criarRepositorio = require('./index');

describe('Jogo Repositorio', () => {
  const DADOS = {
    1: {
      id: 1,
      serie: 'Sonic The Hedgehog',
      titulo: 'Sonic The Hedgehog 2',
      genero: 'Plataforma',
    },
    2: {
      id: 2,
      serie: 'Mario', 
      titulo: 'Super Mario World',
      genero: 'Plataforma',
    },
    3: {
      id: 3,
      serie: 'Final Fantasy',
      titulo: 'Final Fantasy VII',
      genero: 'RPG',
    },
  };
  let db, repositorio;

  beforeEach(() => {
    db = {jogos: {...DADOS}};
    repositorio = criarRepositorio(db);
  });
  

  it('deve recuperar todos os jogos caso nenhuma query seja passada', () => {
    const esperado = [DADOS[1], DADOS[2], DADOS[3]],
    atual = repositorio.recuperarViaQuery();

    assert.deepEqual(atual, esperado);
  });

  it('deve recuperar um jogo pelo id', () => {
    const id = 1,
    esperado = DADOS[id],
    atual = repositorio.recuperarPeloId(id);

    assert.deepEqual(atual, esperado);
  });

  it('deve recuperar jogos por ids', () => {
    const ids = [1, 3],
    esperado = [DADOS[1], DADOS[3]],
    atual = repositorio.recuperarPorIds(ids);

    assert.deepEqual(atual, esperado);
  });

  it('deve salvar um novo jogo', () => {
    const jogosNaBase = () => Object.values(db.jogos).length,
    novo = {
      serie: 'Sonic The Hedgehog',
      titulo: 'Sonic & Knuckles',
      genero: 'Plataforma',
    },
    salvo = repositorio.salvar(novo);

    assert.include(salvo, novo);
    assert.include(db.jogos[salvo.id], salvo);
    assert.equal(jogosNaBase(), 4);
  });

  it('deve atualizar um jogo', () => {
    const idAlvo = 3,
    novoGenero = 'RPG Japonês',
    esperado = {
      serie: 'Final Fantasy',
      titulo: 'Final Fantasy VII',
      genero: novoGenero,
    },
    atualizado = repositorio.atualizar(idAlvo, {genero: novoGenero});

    assert.include(atualizado, esperado);
    assert.include(db.jogos[atualizado.id], atualizado);
  });

  it('deve remover um jogo', () => {
    const idAlvo = 2,
    esperado = {
      serie: 'Mario', 
      titulo: 'Super Mario World',
      genero: 'Plataforma',
    },
    removido = repositorio.remover(idAlvo);

    assert.include(removido, esperado);
    assert.isNotOk(db.jogos[removido.id]);
  });
});
