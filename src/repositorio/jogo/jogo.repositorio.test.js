const { assert } = require('chai'),
criarRepositorio = require('./index');

describe('Jogo Repositorio', () => {
  const DADOS = [
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
  let db, repositorio;

  beforeEach(() => {
    db = [...DADOS];
    repositorio = criarRepositorio(db);
  });
  

  it('deve recuperar todos os jogos caso nenhuma query seja passada', () => {
    const esperado = db,
    atual = repositorio.recuperarViaQuery();

    assert.deepEqual(atual, esperado);
  });

  it('deve recuperar um jogo pelo id', () => {
    const id = 1,
    esperado = db[id - 1],
    atual = repositorio.recuperarPeloId(id);

    assert.deepEqual(atual, esperado);
  });

  it('deve recuperar jogos por ids', () => {
    const ids = [1, 3],
    esperado = [db[0], db[2]],
    atual = repositorio.recuperarPorIds(ids);

    assert.deepEqual(atual, esperado);
  });

  it('deve salvar um novo jogo', () => {
    const novo = {
      serie: 'Sonic The Hedgehog',
      titulo: 'Sonic & Knuckles',
      genero: 'Plataforma',
    },
    salva = repositorio.salvar(novo);

    assert.include(salva, novo);
    assert.include(db, salva);
  });

  it('deve atualizar um jogo', () => {
    const idAlvo = 3,
    novoGenero = 'RPG Japonês',
    esperado = {
      serie: 'Final Fantasy',
      titulo: 'Final Fantasy VII',
      genero: novoGenero,
    },
    atualizada = repositorio.atualizar(idAlvo, {genero: novoGenero});

    assert.include(atualizada, esperado);
    assert.include(db, atualizada);
  });

  it('deve remover um jogo', () => {
    const idAlvo = 2,
    esperado = {
      serie: 'Mario', 
      titulo: 'Super Mario World',
      genero: 'Plataforma',
    },
    removida = repositorio.remover(idAlvo);

    assert.include(removida, esperado);
    assert.notInclude(db, removida);
  });
});
