module.exports = nomeTipo => ({recuperarViaQuery, recuperarPeloId, salvar, atualizar, remover} = repositorio) => ({
  Query: {
    [nomeTipo]: (root, {id}) => recuperarPeloId(id),
    [`${nomeTipo}s`]: () => recuperarViaQuery(),
  },
  Mutation: {
    [`${nomeTipo}Create`]: (root, {input}) => salvar(input),
    [`${nomeTipo}Update`]: (root, {id, input}) => atualizar(id, input),
    [`${nomeTipo}Remove`]: (root, {id}) => remover(id),
  }
});
