const { assert } = require('chai'),
criarRepositorio = require('./index');

describe('Produto Repositorio', () => {
  const DADOS = {
    1: {
      id: 1,
      serie: 'Sonic The Hedgehog',
      titulo: 'Sonic The Hedgehog 2',
      genero: 'Plataforma',
    },
    2: {
      id: 2,
      nome: 'Game Maker VX',
      plataforma: 'Windows',
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
    db = {produtos: {...DADOS}};
    repositorio = criarRepositorio(db);
  });
  

  it('deve recuperar todos os produtos caso nenhuma query seja passada', () => {
    const esperado = [DADOS[1], DADOS[2], DADOS[3]],
    atual = repositorio.recuperarViaQuery();

    assert.deepEqual(atual, esperado);
  });

  it('deve recuperar um produto pelo id', () => {
    const id = 1,
    esperado = DADOS[id],
    atual = repositorio.recuperarPeloId(id);

    assert.deepEqual(atual, esperado);
  });

  it('deve recuperar produtos por ids', () => {
    const ids = [1, 3],
    esperado = [DADOS[1], DADOS[3]],
    atual = repositorio.recuperarPorIds(ids);

    assert.deepEqual(atual, esperado);
  });

  it('deve salvar um novo produto', () => {
    const produtosNaBase = () => Object.values(db.produtos).length,
    novo = {
      serie: 'Sonic The Hedgehog',
      titulo: 'Sonic & Knuckles',
      genero: 'Plataforma',
    },
    salvo = repositorio.salvar(novo);

    assert.include(salvo, novo);
    assert.include(db.produtos[salvo.id], salvo);
    assert.equal(produtosNaBase(), 4);
  });

  it('deve atualizar um produto', () => {
    const idAlvo = 3,
    novoGenero = 'RPG Japonês',
    esperado = {
      serie: 'Final Fantasy',
      titulo: 'Final Fantasy VII',
      genero: novoGenero,
    },
    atualizado = repositorio.atualizar(idAlvo, {genero: novoGenero});

    assert.include(atualizado, esperado);
    assert.include(db.produtos[atualizado.id], atualizado);
  });

  it('deve remover um produto', () => {
    const idAlvo = 2,
    esperado = {
      nome: 'Game Maker VX',
      plataforma: 'Windows',
    },
    removido = repositorio.remover(idAlvo);

    assert.include(removido, esperado);
    assert.isNotOk(db.produtos[removido.id]);
  });
});
