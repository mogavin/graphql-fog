const _repository = require('../../../repositorio/jogo')();

module.exports = ({recuperarViaQuery, recuperarPeloId} = _repository) => ({
	Query: {
    jogo: (root, {id}, context, info) => recuperarPeloId(id),
    jogos: () => recuperarViaQuery(),
	},
});
