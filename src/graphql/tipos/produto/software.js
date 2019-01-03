module.exports = `
type Query {
  software(id: ID!): Software
  softwares: [Software!]!
}
type Mutation {
  softwareCreate(input: SofwareInput!): Software
  softwareUpdate(id: ID!, input: SofwareInput!): Software
  softwareRemove(id: ID!): Software
}
input SofwareInput {
  nome: String
  plataforma: Plataforma
  preco: Float
}
type Software implements Produto & Persistivel {
  id: ID!
  nome: String!
  plataforma: Plataforma!
  preco: Float!
}
enum Plataforma {
  Windows
  Linux
  macOs
}`;
