module.exports = `
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
input ClienteInput {
  nome: String
  cpf: String
  idade: Int
}
type Cliente implements Persistivel {
  id: ID!
  nome: String!
  cpf: String!
  idade: Int!
  listaDesejos: Produto!
  carrinhoCompras: [Produto]!
}`;
