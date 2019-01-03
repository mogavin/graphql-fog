const criarResolverComum = require('../../comum')('software'),
_repositorio = require('../../../../repositorio/software')();

module.exports = (repositorio = _repositorio) => {
  const comum = criarResolverComum(repositorio);
  return {
    ...comum,
    Mutation : {
      ...comum.Mutation,
      softwareAddPlataforma: (root, {id, plataforma}) => 
        repositorio.addPlataforma(id, plataforma),
    },
    Software: {
      __isTypeOf: ({plataformas}) => !!plataformas,
    }
  }
};
