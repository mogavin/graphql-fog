const { mergeTypes } = require('merge-graphql-schemas'),
persistivel = require('../persistivel'),
produto = require('../produto');
usuario = require('./');

const cliente = `
type Query {
  cliente(id: ID!): Cliente
  clientes: [Cliente!]!
}
type Mutation {
  clienteCreate(input: ClienteInput!): Cliente
  clienteUpdate(id: ID!, input: ClienteInput!): Cliente
  clienteRemove(id: ID!): Cliente
  clienteAddProdutosListaDesejos(idCliente: ID!, idsProdutos: [ID!]!): Cliente
  clienteAddProdutosCarrinho(idCliente: ID!, idsProdutos: [ID!]!): Cliente
}
type Cliente implements Persistivel {
  id: ID!
  dados: Pessoa!
  idade: Int!
  listaDesejos: [Produto]!
  carrinhoCompras: [Produto]!
}`;

const typeDefs = [usuario, cliente, persistivel, produto];

module.exports = mergeTypes(typeDefs, { all: true });