const { mergeResolvers } = require('merge-graphql-schemas'),
cliente = require('./cliente')();

const resolvers = [cliente];

module.exports = mergeResolvers(resolvers);
