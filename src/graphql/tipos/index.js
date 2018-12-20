const { mergeTypes } = require('merge-graphql-schemas'),
produto = require('./produto'),
comum = require('./node');

const typeDefs = [produto, comum];

module.exports = mergeTypes(typeDefs, { all: true });
