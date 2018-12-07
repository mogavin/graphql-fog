module.exports = `
type Query {
  pagamento(id: ID!): Pagamento
  pagamentos: [Pagamento]!
}
type Pagamento {
  id: ID!
  forma_de_pagamento: FormaPagamento
  valor: Float
  moeda: Moeda  
  descricao: String
}
enum Moeda {
  USD
}
enum FormaPagamento {
  cartao
}`;
