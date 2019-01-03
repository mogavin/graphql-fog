const { mergeTypes } = require('merge-graphql-schemas'),
jogo = require('./jogo'),
software = require('./software'),
persistivel = require('../comum/persistivel');

const produto = `
interface Produto {
  preco: Float!
}`;

const typeDefs = [jogo, software, produto, persistivel];

module.exports = mergeTypes(typeDefs, { all: true });
