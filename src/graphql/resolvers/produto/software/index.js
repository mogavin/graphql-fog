const criarResolverComum = require('../../comum')('software'),
_repositorio = require('../../../../repositorio/produto')();

module.exports = (repositorio = _repositorio) => ({
  ...criarResolverComum(repositorio),
  Software: {
    __isTypeOf: ({plataforma}) => !!plataforma,
  }
});
