const {getWithQuery, getById} = require('../../../repository/pagamento');

module.exports = {
	Query: {
    pagamento: (root, {id}, context, info) => getById(id),
    pagamentos: () => getWithQuery(),
	},
}
