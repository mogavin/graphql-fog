const {getWithQuery, getById} = require('../../../repository/jogo');

module.exports = {
	Query: {
    jogo: (root, {id}, context, info) => getById(id),
    jogos: () => getWithQuery(),
	},
}
