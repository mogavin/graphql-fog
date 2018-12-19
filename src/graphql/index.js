const { makeExecutableSchema } = require('graphql-tools'),
typeDefs = require('./tipos'),
resolvers = require('./resolvers');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  }
});

module.exports = schema;
