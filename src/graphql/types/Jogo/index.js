module.exports = `
type Query {
  jogo(id: ID!): Jogo
  jogos: [Jogo!]!
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
