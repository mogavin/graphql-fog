module.exports = `
type Query {
  jogo(id: ID!): Jogo
  jogos: [Jogo!]!
}
type Mutation {
  jogoCreate(input: JogoInput!): Jogo
  jogoUpdate(id: ID!, input: JogoInput!): Jogo
  jogoRemove(id: ID!): Jogo
}
input JogoInput {
  serie: String
  titulo: String
  genero: Genero
  preco: Float
}
type Jogo implements Produto & Persistivel {
  id: ID!
  serie: String!
  titulo: String!
  genero: Genero!
  preco: Float!
}
enum Genero {
  Plataforma
  RPG
  Acao
}`;
