module.exports = `
type Query {
  software(id: ID!): Software
  softwares: [Software!]!
}
type Mutation {
  softwareCreate(input: SoftwareInput!): Software
  softwareUpdate(id: ID!, input: SoftwareInput!): Software
  softwareRemove(id: ID!): Software
  softwareAddPlataforma(id: ID!, plataforma: Plataforma!): Software
}
input SoftwareInput {
  nome: String
  plataformas: [Plataforma!]
  preco: Float
}
type Software implements Produto & Persistivel {
  id: ID!
  nome: String!
  plataforma: Plataforma @deprecated(reason: "Utilize \`plataformas\`.")
  plataformas: [Plataforma!]!
  preco: Float!
}
enum Plataforma {
  Windows
  Linux
  macOs
}`;
