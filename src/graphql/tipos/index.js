const { mergeTypes } = require('merge-graphql-schemas'),
produto = require('./produto'),
comum = require('./comum'),
usuario = require('./usuario');

const typeDefs = [produto, comum, usuario];

module.exports = mergeTypes(typeDefs, { all: true });
