const { mergeResolvers } = require('merge-graphql-schemas'),
jogo = require('./jogo')(),
software = require('./software')();

const resolvers = [jogo, software];

module.exports = mergeResolvers(resolvers);
