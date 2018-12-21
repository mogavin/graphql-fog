const _repositorio = require('../../../../repositorio/jogo')();

module.exports = ({recuperarViaQuery, recuperarPeloId, salvar, atualizar, remover} = _repositorio) => ({
	Query: {
    jogo: (root, {id}) => recuperarPeloId(id),
    jogos: () => recuperarViaQuery(),
	},
  Mutation: {
    jogoCreate: (root, {input}) => salvar(input),
    jogoUpdate: (root, {id, input}) => atualizar(id, input),
    jogoRemove: (root, {id}) => remover(id),
  }
});
