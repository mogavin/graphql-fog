module.exports = (engine = []) => ({
  getWithQuery: query => engine,
  getById: id => engine[id - 1],
  save: jogo => {
    const id = engine.length + 1,
    aSalvar = {...jogo, id };
    engine.push(aSalvar);
    return engine[id - 1];
  },
  update: (id, data) => {
    const idAlvo = id - 1,
    alvo = engine[idAlvo];
    engine.splice(idAlvo, 1, {...alvo, ...data});
    return engine[idAlvo];
  }
});
