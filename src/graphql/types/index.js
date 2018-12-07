const { mergeTypes } = require('merge-graphql-schemas'),
Pagamento = require('./Pagamento');

const typeDefs = [Pagamento];

// NOTE: 2nd param is optional, and defaults to false
// Only use if you have defined the same type multiple times in
// different files and wish to attempt merging them together.
module.exports = mergeTypes(typeDefs, { all: true });
