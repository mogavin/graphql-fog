const { makeExecutableSchema } = require('graphql-tools'),
typeDefs = require('./tipos'),
resolvers = require('./resolvers'),
{ DeprecatedDirective } = require('graphql-directive-deprecated');


const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  schemaDirectives: {
    deprecated: DeprecatedDirective
  },
});

module.exports = schema;
