const { assert } = require('chai'),
{ graphql, buildSchema } = require('graphql'),
{ makeExecutableSchema } = require('graphql-tools'),
{ mergeTypes } = require('merge-graphql-schemas'),
criarSoftwareResolver = require('../resolvers/produto/software'),
criarProdutoRepositorio = require('../../repositorio/produto'),
produtoType = require('../tipos/produto'),
comumType = require('../tipos/comum'),
{ DeprecatedDirective } = require('graphql-directive-deprecated');


describe('Software Queries', () => {
  const SOFTWARES = {
    1: {
      id: 1,
      nome: 'Game Maker VX',
      plataformas: ['Windows', 'macOs'],
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
      plataformas: ['macOs', 'Linux'],
      preco: 200.50,
    },
  },
  db = {produtos: {}},
  repositorio = criarProdutoRepositorio(db),
  resolver = criarSoftwareResolver(repositorio),
  schema = makeExecutableSchema({
    typeDefs: mergeTypes([comumType, produtoType], { all: true }),
    resolvers: [resolver],
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    schemaDirectives: {
      deprecated: DeprecatedDirective
    },
  }),
  limparDb = () => db.produtos = {},
  popularDb = () => db.produtos = {...SOFTWARES};

  beforeEach(() => {
    limparDb();
    popularDb();
  });


  it('deve buscar todos os softwares', async () => {
    const query = `
      {
        softwares {
          nome
        }  
      }
    `;
    const atual = await graphql(schema, query),
    esperado = { 
      data: { 
        softwares: [
          {nome: 'Game Maker VX'},
          {nome: 'Fences'},
          {nome: 'Start10'},
        ],
      } 
    };

    assert.deepEqual(atual, esperado, atual.errors);
  });

  it('deve buscar softwares pelo id', async () => {
    const query = `
      {
        software(id: 1) {
          nome
        }  
      }
    `;
    const atual = await graphql(schema, query),
    esperado = { 
      data: { 
        software: { 
          nome: 'Game Maker VX',
        } 
      } 
    };

    assert.deepEqual(atual, esperado, atual.errors);
  });

  it('deve criar um novo software', async () => {
    const mutation = `
      mutation {
        softwareCreate(input: {
          nome: "Rone",
          preco: 800.00,
          plataformas: [Linux, Windows]
        }){
          nome
        }
      }
    `;
    const atual = await graphql(schema, mutation),
    esperado = { 
      data: { 
        softwareCreate: { 
          nome: 'Rone',
        } 
      } 
    };

    assert.deepEqual(atual, esperado, atual.errors);
  });

  it('deve atualizar dados de um software existente', async () => {
    const mutation = `
      mutation {
        softwareUpdate(id: 3, input: { preco: 150.00 }) {
          id
          nome
          plataforma
          preco
        }
      }
    `;
    const atual = await graphql(schema, mutation),
    esperado = { 
      data: { 
        softwareUpdate: { 
          id: '3',
          nome: 'Start10',
          plataforma: 'macOs',
          preco: 150.00,
        } 
      }
    };

    assert.deepEqual(atual, esperado, atual.errors);
  });

  it('deve remover softwares pelo id', async () => {
    const mutation = `
      mutation {
        softwareRemove(id: 2) {
          nome
        }  
      }
    `;
    const atual = await graphql(schema, mutation),
    esperado = { 
      data: {
        softwareRemove: { 
          nome: 'Fences',
        } 
      } 
    };

    assert.deepEqual(atual, esperado, atual.errors);
  });
});
