const express = require('express'),
graphqlHTTP = require('express-graphql'),
schema = require('./graphql');

const port = 3000,
app = express();

app.use('/', graphqlHTTP({
  schema: schema,
  graphiql: process.env.NODE_ENV === 'development'
}));

app.listen(port);
console.log('GraphQL API server running at localhost:'+ port);
