const { assert } = require('chai'),
createRepository = require('./index'),
initialData = require('./data');

describe('Jogo Repository', () => {
  const dbEngine = [
    {
      id: 1,
      serie: 'Blue Hedgehog',
      titulo: 'Blue Hedgehog 2',
      genero: 'Plataforma',
    },
    {
      id: 2,
      serie: 'Jumper Plumber', 
      titulo: 'Super Jumper Plumber',
      genero: 'Plataforma',
    },
    {
      id: 3,
      serie: 'Spiked Hair Fantasy',
      titulo: 'Spiked Hair Fantasy VVIII',
      genero: 'RPG',
    },
  ],
  repository = createRepository(dbEngine);

  it('deve recuperar todos os jogos caso nenhuma query seja passada', () => {
    const expected = dbEngine,
    actual = repository.getWithQuery();

    assert.deepEqual(actual, expected);
  });

  it('deve recuperar um jogo pelo id', () => {
    const id = 1,
    expected = dbEngine[id - 1],
    actual = repository.getById(id);

    assert.deepEqual(actual, expected);
  });
});
