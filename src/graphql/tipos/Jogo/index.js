module.exports = `
type Query {
  jogo(id: ID!): Jogo
  jogos: [Jogo!]!
}
type Mutation {
  jogoCreate(serie: String!, titulo: String!, genero: String!): Jogo
}
type Jogo {
  id: ID!
  serie: String
  titulo: String
  genero: Genero
}
enum Genero {
  Plataforma
  RPG
}`;
