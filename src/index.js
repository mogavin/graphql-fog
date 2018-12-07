const express = require('express'),
graphqlHTTP = require('express-graphql'),
schema = require('./graphql');

const port = 3000,
app = express();

app.use('/', graphqlHTTP({
  schema: schema,
  graphiql: true //Set to false if you don't want graphiql enabled
}));

app.listen(port);
console.log('GraphQL API server running at localhost:'+ port);
