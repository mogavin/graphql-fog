const express = require('express'),
graphqlHTTP = require('express-graphql'),
{ makeExecutableSchema } = require('graphql-tools');

const port = 3000;

const typeDefs = `
type Query {
  user: User
}
type User {
  name: String
}`;

const resolvers = {
  Query: {
    user: (root, args, context, info) => {
      return {name: 'Teste'};
    }
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const app = express();
app.use('/', graphqlHTTP({
  schema: schema,
  graphiql: true //Set to false if you don't want graphiql enabled
}));

app.listen(port);
console.log('GraphQL API server running at localhost:'+ port);
