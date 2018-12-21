const { assert } = require('chai'),
{ graphql, buildSchema } = require('graphql'),
{ makeExecutableSchema } = require('graphql-tools'),
criarJogoResolver = require('../resolvers/produto/jogo'),
criarJogoRepositorio = require('../../repositorio/jogo'),
type = require('../tipos/produto/jogo');

describe('Jogo Queries', () => {
  const JOGOS = [
    {
      id: 1,
      serie: 'Sonic The Hedgehog',
      titulo: 'Sonic The Hedgehog 2',
      genero: 'Plataforma',
      preco: 60.00,
    },
    {
      id: 2,
      serie: 'Mario', 
      titulo: 'Super Mario World',
      genero: 'Plataforma',
      preco: 10.00,
    },
    {
      id: 3,
      serie: 'Final Fantasy',
      titulo: 'Final Fantasy VII',
      genero: 'RPG',
      preco: 200.50,
    },
  ],
  db = [],
  repositorio = criarJogoRepositorio(db),
  resolver = criarJogoResolver(repositorio),
  schema = makeExecutableSchema({
    typeDefs: [type],
    resolvers: [resolver],
    resolverValidationOptions: {
      requireResolversForResolveType: false
    }
  }),
  limparDb = () => db.splice(0, db.length),
  popularDb = () => db.push(...JOGOS);

  beforeAll(() => {
    limparDb();
    popularDb();
  });


  it('deve buscar todos os jogos', async () => {
    const query = `
      {
        jogos {
          serie
        }  
      }
    `;
    const atual = await graphql(schema, query),
    esperado = { 
      data: { 
        jogos: [
          {serie: 'Sonic The Hedgehog'},
          {serie: 'Mario'},
          {serie: 'Final Fantasy'},
        ],
      } 
    };

    assert.deepEqual(atual, esperado, atual.errors);
  });

  it('deve buscar jogos pelo id', async () => {
    const query = `
      {
        jogo(id: 1) {
          serie
        }  
      }
    `;
    const atual = await graphql(schema, query),
    esperado = { 
      data: { 
        jogo: { 
          serie: 'Sonic The Hedgehog',
        } 
      } 
    };

    assert.deepEqual(atual, esperado, atual.errors);
  });

  it('deve criar um novo jogo', async () => {
    const mutation = `
      mutation {
        jogoCreate(input: {
            serie: "Resident Evil", 
            titulo: "Resident Evil 3: Nemesis", 
            genero: Acao, 
            preco: 100.00
        }){
          serie
        }
      }
    `;
    const atual = await graphql(schema, mutation),
    esperado = { 
      data: { 
        jogoCreate: { 
          serie: 'Resident Evil',
        } 
      } 
    };

    assert.deepEqual(atual, esperado, atual.errors);
  });

  it('deve atualizar dados de um jogo existente', async () => {
    const mutation = `
      mutation {
        jogoUpdate(id: 3, input: { titulo: "Final Fantasy X" }) {
          id
          titulo
        }
      }
    `;
    const atual = await graphql(schema, mutation),
    esperado = { 
      data: { 
        jogoUpdate: { 
          id: '3',
          titulo: 'Final Fantasy X',
        } 
      }
    };

    assert.deepEqual(atual, esperado, atual.errors);
  });

  it('deve remover jogos pelo id', async () => {
    const mutation = `
      mutation {
        jogoRemove(id: 2) {
          serie
        }  
      }
    `;
    const atual = await graphql(schema, mutation),
    esperado = { 
      data: {
        jogoRemove: { 
          serie: 'Mario',
        } 
      } 
    };

    assert.deepEqual(atual, esperado, atual.errors);
  });
});
