const { assert } = require('chai'),
criarRepositorio = require('./index');

describe('UsuarioFog Repositorio', () => {
  const DADOS = [
    {
      id: 1,
      nome: 'Jack Tequila',
      idade: 40,
      cpf: '42702801315',
      listaDesejos: [3, 6, 8],
      carrinhoCompras: [5, 25, 8],
    },
    {
      id: 2,
      nome: 'Katia Flavia',
      idade: 18,
      cpf: '17853149808',
      listaDesejos: [1],
      carrinhoCompras: [41, 89],
    },
    {
      id: 3,
      nome: 'Florentina de Jesus',
      idade: 50,
      cpf: '34873692571',
      listaDesejos: [28],
      carrinhoCompras: [],
    },    
  ];
  let db, repositorio;

  beforeEach(() => {
    db = [...DADOS];
    repositorio = criarRepositorio(db);
  });
  

  it('deve recuperar todos os usuarios caso nenhuma query seja passada', () => {
    const expected = db,
    actual = repositorio.recuperarViaQuery();

    assert.deepEqual(actual, expected);
  });

  it('deve recuperar um usuario pelo id', () => {
    const idAlvo = 1,
    expected = DADOS[idAlvo - 1],
    actual = repositorio.recuperarPeloId(idAlvo);

    assert.deepEqual(actual, expected);
  });

  it('deve salvar um novo usuario', () => {
    const novo = {
      nome: 'João de Santo Cristo',
      idade: 30,
      cpf: '23550366248',
      listaDesejos: [],
      carrinhoCompras: [],
    },
    salvo = repositorio.salvar(novo);

    assert.include(salvo, novo);
    assert.include(db, salvo);
  });

  it('deve atualizar os dados de um usuario', () => {
    const idAlvo = 3,
    novaIdade = 41,
    expected = {
      ...DADOS[idAlvo - 1],
      idade: novaIdade,
    },
    atualizado = repositorio.atualizar(idAlvo, {idade: novaIdade});

    assert.include(atualizado, expected);
    assert.include(db, atualizado);
  });

  it('deve remover um usuario', () => {
    const idAlvo = 2,
    expected = {
      ...DADOS[idAlvo - 1],
    },
    removido = repositorio.remover(idAlvo);

    assert.include(removido, expected);
    assert.notInclude(db, removido);
  });

  it('deve adicionar um novo produto na lista de desejos de um usuario', () => {
    const idUsuario = 2,
    usuario = DADOS[idUsuario - 1],
    idProduto = 501,
    expected = {
      ...usuario,
      listaDesejos: [...usuario.listaDesejos, idProduto],
    },
    atualizado = repositorio.addProdutoListaDesejos(idUsuario, idProduto);

    assert.deepInclude(atualizado, expected);
    assert.include(db, atualizado);
  });

  it('deve adicionar um novo produto no carrinho de compras de um usuario', () => {
    const idUsuario = 2,
    usuario = DADOS[idUsuario - 1],
    idProduto = 501,
    expected = {
      ...usuario,
      carrinhoCompras: [...usuario.carrinhoCompras, idProduto],
    },
    atualizado = repositorio.addProdutoCarrinho(idUsuario, idProduto);

    assert.deepInclude(atualizado, expected);
    assert.include(db, atualizado);
  });
});
