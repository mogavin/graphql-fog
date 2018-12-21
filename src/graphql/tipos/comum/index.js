const { mergeTypes } = require('merge-graphql-schemas'),
persistivel = require('./persistivel');

const typeDefs = [persistivel];

module.exports = mergeTypes(typeDefs, { all: true });
