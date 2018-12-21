const resolverComum = require('../../comum')('jogo'),
_repositorio = require('../../../../repositorio/jogo')();

module.exports = (repositorio = _repositorio) => ({
	...resolverComum(repositorio),
});
