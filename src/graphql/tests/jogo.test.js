const { assert } = require('chai'),
{ graphql, buildSchema } = require('graphql'),
schema =  require('../');

describe('Jogo Query Tests', () => {
  it('deve executar query graphql', async () => {
    const query = `
        {
          jogo(id: 3) {
            serie
          }  
        }
      `;
    const actual = await graphql(schema, query);
    console.log(actual);
  });
});