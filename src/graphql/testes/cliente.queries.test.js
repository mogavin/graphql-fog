const { assert } = require('chai'),
{ graphql, buildSchema } = require('graphql'),
{ makeExecutableSchema } = require('graphql-tools'),
{ mergeResolvers, mergeTypes } = require('merge-graphql-schemas'),
criarClienteRepositorio = require('../../repositorio/cliente'),
criarJogoRepositorio = require('../../repositorio/jogo'),
criarClienteResolver = require('../resolvers/usuario/cliente'),
criarJogoResolver = require('../resolvers/produto/jogo'),
produtoType = require('../tipos/produto'),
usuarioType = require('../tipos/usuario');

describe('Cliente Queries', () => {
  const CLIENTES = {
    1: {
      id: 1,
      nome: 'Jack Tequila',
      idade: 40,
      cpf: '42702801315',
      listaDesejos: [1, 2, 3],
      carrinhoCompras: [1, 3],
    },
    2: {
      id: 2,
      nome: 'Katia Flavia',
      idade: 18,
      cpf: '17853149808',
      listaDesejos: [1],
      carrinhoCompras: [2, 3],
    },
    3: {
      id: 3,
      nome: 'Florentina de Jesus',
      idade: 50,
      cpf: '34873692571',
      listaDesejos: [3],
      carrinhoCompras: [],
    },    
  },
  JOGOS = {
    1: {
      id: 1,
      serie: 'Sonic The Hedgehog',
      titulo: 'Sonic The Hedgehog 2',
      genero: 'Plataforma',
      preco: 60.00,
    },
    2: {
      id: 2,
      serie: 'Mario', 
      titulo: 'Super Mario World',
      genero: 'Plataforma',
      preco: 10.00,
    },
    3: {
      id: 3,
      serie: 'Final Fantasy',
      titulo: 'Final Fantasy VII',
      genero: 'RPG',
      preco: 200.50,
    },
  },
  db = {clientes: {}, jogos: {}},
  clienteRepositorio = criarClienteRepositorio(db),
  jogoRepositorio = criarJogoRepositorio(db),
  clienteResolver = criarClienteResolver({
    clienteRepositorio,
    produtoRepositorio: jogoRepositorio,
  }),
  jogoResolver = criarJogoResolver(jogoRepositorio),
  schema = makeExecutableSchema({
    typeDefs: mergeTypes([usuarioType, produtoType], { all: true }),
    resolvers: mergeResolvers([clienteResolver, jogoResolver]),
    resolverValidationOptions: {
      requireResolversForResolveType: false
    }
  }),
  limparDb = () => {
    db.clientes = {};
    db.jogos = {};
  },
  popularDb = () => {
    db.clientes = {...CLIENTES};
    db.jogos = {...JOGOS};
  };

  beforeEach(() => {
    limparDb();
    popularDb();
  });


  it('deve buscar todos os clientes', async () => {
    const query = `
      {
        clientes {
          nome
        }  
      }
    `;
    const atual = await graphql(schema, query),
    esperado = { 
      data: { 
        clientes: [
          {
            nome: 'Jack Tequila'
          },
          {
            nome: 'Katia Flavia'
          },
          {
            nome: 'Florentina de Jesus'
          },
        ],
      } 
    };

    assert.deepEqual(atual, esperado, atual.errors);
  });

  it('deve buscar clientes pelo id', async () => {
    const query = `
      {
        cliente(id: 1) {
          nome
        }  
      }
    `;
    const atual = await graphql(schema, query),
    esperado = { 
      data: { 
        cliente: { 
          nome: 'Jack Tequila'
        } 
      } 
    };

    assert.deepEqual(atual, esperado, atual.errors);
  });

  it('deve criar um novo cliente', async () => {
    const mutation = `
      mutation {
        clienteCreate(input: {
          nome: "João de Santo Cristo",
          idade: 30,
          cpf: "23550366248"
        }){
          nome
          idade
          cpf
        }
      }
    `;
    const atual = await graphql(schema, mutation),
    esperado = { 
      data: { 
        clienteCreate: {
          nome: 'João de Santo Cristo',
          idade: 30,
          cpf: "23550366248",
        } 
      } 
    };        

    assert.deepEqual(atual, esperado, atual.errors);
  });

  it('deve atualizar dados de um cliente existente', async () => {
    const mutation = `
      mutation {
        clienteUpdate(id: 3, input: { idade: 80 }) {
          id
          nome
          idade
        }
      }
    `;
    const atual = await graphql(schema, mutation),
    esperado = { 
      data: { 
        clienteUpdate: { 
          id: '3',
          nome: 'Florentina de Jesus',
          idade: 80,
        } 
      }
    };

    assert.deepEqual(atual, esperado, atual.errors);
  });

  it('deve remover clientes pelo id', async () => {
    const mutation = `
      mutation {
        clienteRemove(id: 2) {
          nome
        }  
      }
    `;
    const atual = await graphql(schema, mutation),
    esperado = { 
      data: {
        clienteRemove: { 
          nome: 'Katia Flavia',
        } 
      } 
    };

    assert.deepEqual(atual, esperado, atual.errors);
  });

  it('deve recuperar os produtos da lista de desejos', async () => {
    const query = `
      {
        cliente(id: 1) {
          listaDesejos {
            preco
          }
        }
      }  
    `;
    const atual = await graphql(schema, query),
    esperado = { 
      data: {
        cliente: { 
          listaDesejos: [
            {
              preco: 60,
            },
            {
              preco: 10,
            },
            {
              preco: 200.50,
            },
          ],
        } 
      } 
    };

    assert.deepEqual(atual, esperado, atual.errors);
  });

  it('deve recuperar os produtos do carrinho de compras', async () => {
    const query = `
      {
        cliente(id: 2) {
          carrinhoCompras {
            preco
            ... on Jogo {
              titulo
            }
          }
        }
      }  
    `;
    const atual = await graphql(schema, query),
    esperado = { 
      data: {
        cliente: { 
          carrinhoCompras: [
            {
              preco: 10,
              titulo: 'Super Mario World',
            },
            {
              preco: 200.50,
              titulo: 'Final Fantasy VII',
            },
          ],
        } 
      } 
    };

    assert.deepEqual(atual, esperado, atual.errors);
  });
});
