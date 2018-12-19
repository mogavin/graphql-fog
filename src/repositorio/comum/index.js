module.exports = db => ({
  recuperarViaQuery: query => db,
  recuperarPeloId: id => db[id - 1],
  salvar: jogo => {
    const id = db.length + 1,
    aSalvar = {...jogo, id };
    db.push(aSalvar);
    return db[id - 1];
  },
  atualizar: (id, input) => {
    const idAlvo = id - 1,
    alvo = db[idAlvo];
    db.splice(idAlvo, 1, {...alvo, ...input});
    return db[idAlvo];
  }
});
