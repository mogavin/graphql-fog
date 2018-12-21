const { mergeResolvers } = require('merge-graphql-schemas'),
jogo = require('./jogo')();

const resolvers = [jogo];

module.exports = mergeResolvers(resolvers);
