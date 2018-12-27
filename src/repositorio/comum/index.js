module.exports = (db, nomeCollection) => {
  return {
    recuperarViaQuery: query => 
      Object.values(db[nomeCollection]).reduce((resp, value) => 
        resp.concat(value)
      , []),
    recuperarPeloId: id => db[nomeCollection][id],
    salvar: data => {
      const id = Object.keys(db[nomeCollection]).length + 1;
      db[nomeCollection][id] = {...data, id};
      return db[nomeCollection][id];
    },
    atualizar: (id, input) => {
      const alvo = db[nomeCollection][id];
      db[nomeCollection][id] = {...alvo, ...input};
      return db[nomeCollection][id];
    },
    remover: id => {
      const removido = db[nomeCollection][id];
      delete db[nomeCollection][id];
      return removido;
    },
  }
};
