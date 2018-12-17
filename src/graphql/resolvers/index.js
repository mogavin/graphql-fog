const { mergeResolvers } = require('merge-graphql-schemas'),
Jogo = require('./Jogo')();

const resolvers = [Jogo];

module.exports = mergeResolvers(resolvers);
