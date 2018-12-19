const { assert } = require('chai'),
criarRepositorio = require('./index');

describe('Pessoa Repositorio', () => {
  const db = [
    {
      id: 1,
      nome: 'Jack Tequila',
      idade: 40,
      cpf: '42702801315',
    },
    {
      id: 2,
      nome: 'Katia Flavia',
      idade: 18,
      cpf: '17853149808',
    },
    {
      id: 3,
      nome: 'Florentina de Jesus',
      idade: 50,
      cpf: '34873692571',
    },    
  ];
  let repositorio;

  beforeEach(() => {
    repositorio = criarRepositorio(db);
  });

  it('deve recuperar todos as pessoas caso nenhuma query seja passada', () => {
    const expected = db,
    actual = repositorio.recuperarViaQuery();

    assert.deepEqual(actual, expected);
  });

  it('deve recuperar uma pessoa pelo id', () => {
    const id = 1,
    expected = db[id - 1],
    actual = repositorio.recuperarPeloId(id);

    assert.deepEqual(actual, expected);
  });

  it('deve salvar uma nova pessoa', () => {
    const novo = {
      nome: 'João de Santo Cristo',
      idade: 30,
      cpf: '23550366248',
    },
    actual = repositorio.salvar(novo);

    assert.include(actual, novo);
  });

  it('deve atualizar os dados de uma pessoa', () => {
    const idAlvo = 3,
    novaIdade = 41,
    expected = {
      nome: 'Florentina de Jesus',
      idade: novaIdade,
      cpf: '34873692571',
    },
    actual = repositorio.atualizar(idAlvo, {idade: novaIdade});

    assert.include(actual, expected);
  });
});
