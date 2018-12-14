const _repository = require('../../../repository/jogo')();

module.exports = ({getWithQuery, getById} = _repository) => ({
	Query: {
    jogo: (root, {id}, context, info) => getById(id),
    jogos: () => getWithQuery(),
	},
});
