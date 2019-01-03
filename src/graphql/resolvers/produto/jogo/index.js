const criarResolverComum = require('../../comum')('jogo'),
_repositorio = require('../../../../repositorio/produto')();

module.exports = (repositorio = _repositorio) => ({
	...criarResolverComum(repositorio),
  Jogo: {
    __isTypeOf: ({genero}) => !!genero,
  }
});
