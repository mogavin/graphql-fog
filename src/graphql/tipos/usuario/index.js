const { mergeTypes } = require('merge-graphql-schemas'),
persistivel = require('../comum/persistivel'),
produto = require('../produto'),
cliente = require('./cliente');

const typeDefs = [cliente, persistivel, produto];

module.exports = mergeTypes(typeDefs, { all: true });
