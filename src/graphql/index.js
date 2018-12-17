const { makeExecutableSchema } = require('graphql-tools'),
typeDefs = require('./tipos'),
resolvers = require('./resolvers');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = schema;
