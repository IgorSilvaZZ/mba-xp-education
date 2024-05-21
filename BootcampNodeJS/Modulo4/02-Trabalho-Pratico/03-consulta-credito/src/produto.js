const db = require('./db');

const listarProdutos = async () => {
  const produtos = await db.produto.findAll();

  return produtos;
};

const criarProduto = async (codigo, descricao, preco) => {
  const produtoExistente = await db.produto.findOne({
    where: { Codigo: codigo },
  });

  if (produtoExistente) {
    await db.produto.update(
      { Codigo: codigo, Descricao: descricao, Preco: preco },
      {
        where: {
          Codigo: codigo,
        },
      }
    );

    return { message: 'Produto atualizado com successo!' };
  } else {
    await db.produto.create({
      Codigo: codigo,
      Descricao: descricao,
      Preco: preco,
    });

    return { message: 'Produto criado com successo!' };
  }
};

const atualizarProduto = async (codigo, descricao, preco) => {
  const produtoExistente = await db.produto.findOne({
    where: { Codigo: codigo },
  });

  if (!produtoExistente) {
    throw new Error('Produto com código informado não encontado!');
  }

  await db.produto.update(
    { Descricao: descricao, Preco: preco },
    {
      where: {
        Codigo: codigo,
      },
    }
  );

  return { message: 'Produto atualizado com sucesso!' };
};

const deletarProduto = async codigo => {
  const produtoExistente = await db.produto.findOne({
    where: { Codigo: codigo },
  });

  if (!produtoExistente) {
    throw new Error('Produto com código informado não encontado!');
  }

  await db.produto.destroy({
    where: {
      Codigo: codigo,
    },
  });

  return { message: 'Produto deletado com sucesso!' };
};

module.exports = {
  listarProdutos,
  criarProduto,
  atualizarProduto,
  deletarProduto,
};
