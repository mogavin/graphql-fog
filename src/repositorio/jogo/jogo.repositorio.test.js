const { assert } = require('chai'),
criarRepositorio = require('./index');

describe('Jogo Repositorio', () => {
  const db = [
    {
      id: 1,
      serie: 'Sonic The Hedgehog',
      titulo: 'Sonic The Hedgehog 2',
      genero: 'Plataforma',
    },
    {
      id: 2,
      serie: 'Mario', 
      titulo: 'Super Mario World',
      genero: 'Plataforma',
    },
    {
      id: 3,
      serie: 'Final Fantasy',
      titulo: 'Final Fantasy VII',
      genero: 'RPG',
    },
  ];
  let repositorio;

  beforeEach(() => {
    repositorio = criarRepositorio(db);
  });

  it('deve recuperar todos os jogos caso nenhuma query seja passada', () => {
    const expected = db,
    actual = repositorio.recuperarViaQuery();

    assert.deepEqual(actual, expected);
  });

  it('deve recuperar um jogo pelo id', () => {
    const id = 1,
    expected = db[id - 1],
    actual = repositorio.recuperarPeloId(id);

    assert.deepEqual(actual, expected);
  });

  it('deve salvar um novo jogo', () => {
    const novo = {
      serie: 'Sonic The Hedgehog',
      titulo: 'Sonic & Knuckles',
      genero: 'Plataforma',
    },
    actual = repositorio.salvar(novo);

    assert.include(actual, novo);
  });

  it('deve atualizar um jogo', () => {
    const idAlvo = 3,
    novoGenero = 'RPG Japonês',
    expected = {
      serie: 'Final Fantasy',
      titulo: 'Final Fantasy VII',
      genero: novoGenero,
    },
    actual = repositorio.atualizar(idAlvo, {genero: novoGenero});

    assert.include(actual, expected);
  });
});
