const { mergeTypes } = require('merge-graphql-schemas'),
persistivel = require('./persistivel'),
diretivas = require('./diretivas');


const typeDefs = [persistivel, diretivas];

module.exports = mergeTypes(typeDefs, { all: true });
