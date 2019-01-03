module.exports = `
type Query {
  software(id: ID!): Software
  softwares: [Software!]!
}
type Mutation {
  softwareCreate(input: SofwareInput!): Software
  softwareUpdate(id: ID!, input: SofwareInput!): Software
  softwareRemove(id: ID!): Software
  softwareAddPlataforma(plataforma: Plataforma!): Software
}
input SofwareInput {
  nome: String
  plataformas: [Plataforma]
  preco: Float
}
type Software implements Produto & Persistivel {
  id: ID!
  nome: String!
  plataforma: Plataforma! @deprecated(reason: "Utilize \`plataformas\`.")
  plataformas: [Plataforma!]!
  preco: Float!
}
enum Plataforma {
  Windows
  Linux
  macOs
}`;
