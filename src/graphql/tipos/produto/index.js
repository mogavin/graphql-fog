const { mergeTypes } = require('merge-graphql-schemas'),
jogo = require('./jogo'),
persistivel = require('../comum/persistivel');

const produto = `
interface Produto {
  preco: Float!
}`;

const typeDefs = [jogo, produto, persistivel];

module.exports = mergeTypes(typeDefs, { all: true });
