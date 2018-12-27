const { assert } = require('chai'),
criarRepositorio = require('./index');

describe('Cliente Repositorio', () => {
  const DADOS = {
    1: {
      id: 1,
      nome: 'Jack Tequila',
      idade: 40,
      cpf: '42702801315',
      listaDesejos: [3, 6, 8],
      carrinhoCompras: [5, 25, 8],
    },
    2: {
      id: 2,
      nome: 'Katia Flavia',
      idade: 18,
      cpf: '17853149808',
      listaDesejos: [1],
      carrinhoCompras: [41, 89],
    },
    3: {
      id: 3,
      nome: 'Florentina de Jesus',
      idade: 50,
      cpf: '34873692571',
      listaDesejos: [28],
      carrinhoCompras: [],
    },    
  };
  let db, repositorio;

  beforeEach(() => {
    db = {clientes: {...DADOS}};
    repositorio = criarRepositorio(db);
  });
  

  it('deve recuperar todos os clientes caso nenhuma query seja passada', () => {
    const esperado = [DADOS[1], DADOS[2], DADOS[3]],
    atual = repositorio.recuperarViaQuery();

    assert.deepEqual(atual, esperado);
  });

  it('deve recuperar um cliente pelo id', () => {
    const idAlvo = 2,
    esperado = DADOS[idAlvo],
    atual = repositorio.recuperarPeloId(idAlvo);

    assert.deepEqual(atual, esperado);
  });

  it('deve salvar um novo cliente', () => {
    const clientesNaBase = () => Object.values(db.clientes).length,
    novo = {
      nome: 'João de Santo Cristo',
      idade: 30,
      cpf: '23550366248',
      listaDesejos: [],
      carrinhoCompras: [],
    },
    salvo = repositorio.salvar(novo);

    assert.include(salvo, novo);
    assert.include(db.clientes[salvo.id], salvo);
    assert.equal(clientesNaBase(), 4);
  });

  it('deve atualizar os dados de um cliente', () => {
    const idAlvo = 3,
    novaIdade = 41,
    esperado = {
      ...DADOS[idAlvo],
      idade: novaIdade,
    },
    atualizado = repositorio.atualizar(idAlvo, {idade: novaIdade});

    assert.include(atualizado, esperado);
    assert.include(db.clientes[atualizado.id], atualizado);
  });

  it('deve remover um cliente', () => {
    const idAlvo = 2,
    esperado = {
      ...DADOS[idAlvo],
    },
    removido = repositorio.remover(idAlvo);

    assert.include(removido, esperado);
    assert.isNotOk(db.clientes[removido.id]);
  });

  it('deve adicionar novos produtos na lista de desejos de um cliente', () => {
    const idCliente = 2,
    cliente = DADOS[idCliente],
    idsProdutos = [501, 784],
    esperado = {
      ...cliente,
      listaDesejos: [...cliente.listaDesejos, ...idsProdutos],
    },
    atualizado = repositorio.addProdutosListaDesejos(idCliente, idsProdutos);

    assert.deepInclude(atualizado, esperado);
    assert.include(db.clientes[atualizado.id], atualizado);
  });

  it('deve adicionar novos produtos no carrinho de compras de um cliente', () => {
    const idCliente = 2,
    cliente = DADOS[idCliente],
    idsProdutos = [501, 784],
    esperado = {
      ...cliente,
      carrinhoCompras: [...cliente.carrinhoCompras, ...idsProdutos],
    },
    atualizado = repositorio.addProdutosCarrinho(idCliente, idsProdutos);

    assert.deepInclude(atualizado, esperado);
    assert.include(db.clientes[atualizado.id], atualizado);
  });
});
