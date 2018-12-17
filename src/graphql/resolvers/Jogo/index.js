const _repositorio = require('../../../repositorio/jogo')();

module.exports = ({recuperarViaQuery, recuperarPeloId, salvar, atualizar} = _repositorio) => ({
	Query: {
    jogo: (root, {id}) => recuperarPeloId(id),
    jogos: () => recuperarViaQuery(),
	},
  Mutation: {
    jogoCreate: (root, jogo) => salvar(jogo),
    jogoUpdate: (root, {id, data}) => atualizar(id, data),
  }
});
