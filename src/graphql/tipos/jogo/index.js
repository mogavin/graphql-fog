module.exports = `
type Query {
  jogo(id: ID!): Jogo
  jogos: [Jogo!]!
}
type Mutation {
  jogoCreate(input: JogoInput!): Jogo
  jogoUpdate(id: ID!, input: JogoInput!): Jogo
}
input JogoInput {
  serie: String
  titulo: String
  genero: Genero
}
type Jogo implements Node {
  id: ID!
  serie: String
  titulo: String
  genero: Genero
}
enum Genero {
  Plataforma
  RPG
  Acao
}`;
