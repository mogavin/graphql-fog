const criarResolverComum = require('../../comum')('jogo'),
_repositorio = require('../../../../repositorio/jogo')();

module.exports = (repositorio = _repositorio) => ({
	...criarResolverComum(repositorio),
});
