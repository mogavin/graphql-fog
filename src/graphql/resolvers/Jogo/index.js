const _repositorio = require('../../../repositorio/jogo')();

module.exports = ({recuperarViaQuery, recuperarPeloId, salvar} = _repositorio) => ({
	Query: {
    jogo: (root, {id}) => recuperarPeloId(id),
    jogos: () => recuperarViaQuery(),
	},
  Mutation: {
    jogoCreate: (root, jogo) => salvar(jogo),
  }
});
