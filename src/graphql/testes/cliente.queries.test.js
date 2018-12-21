const { assert } = require('chai'),
{ graphql, buildSchema } = require('graphql'),
{ makeExecutableSchema } = require('graphql-tools'),
criarClienteResolver = require('../resolvers/usuario/cliente'),
criarClienteRepositorio = require('../../repositorio/cliente'),
type = require('../tipos/usuario/cliente');

describe('Cliente Queries', () => {
  const CLIENTES = [
    {
      id: 1,
      nome: 'Jack Tequila',
      idade: 40,
      cpf: '42702801315',
      listaDesejos: [3, 6, 8],
      carrinhoCompras: [5, 25, 8],
    },
    {
      id: 2,
      nome: 'Katia Flavia',
      idade: 18,
      cpf: '17853149808',
      listaDesejos: [1],
      carrinhoCompras: [41, 89],
    },
    {
      id: 3,
      nome: 'Florentina de Jesus',
      idade: 50,
      cpf: '34873692571',
      listaDesejos: [28],
      carrinhoCompras: [],
    },    
  ],
  db = [],
  repositorio = criarClienteRepositorio(db),
  resolver = criarClienteResolver(repositorio),
  schema = makeExecutableSchema({
    typeDefs: [type],
    resolvers: [resolver],
    resolverValidationOptions: {
      requireResolversForResolveType: false
    }
  }),
  limparDb = () => db.splice(0, db.length),
  popularDb = () => db.push(...CLIENTES);

  beforeAll(() => {
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
        }
      }
    `;
    const atual = await graphql(schema, mutation),
    esperado = { 
      data: { 
        clienteCreate: { 
          nome: 'João de Santo Cristo',
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
        }
      }
    `;
    const atual = await graphql(schema, mutation),
    esperado = { 
      data: { 
        clienteUpdate: { 
          id: '3',
          nome: 'Florentina de Jesus',
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
});
