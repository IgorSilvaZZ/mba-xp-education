const express = require('express');

const app = express();

const { check, validationResult } = require('express-validator');

const consultaCliente = require('./consulta-cliente');
const {
  listarProdutos,
  criarProduto,
  atualizarProduto,
  deletarProduto,
} = require('./produto');

app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).send('Bootcamp desenvolvedor back end - Tópicos especiais!');
});

app.get('/produto', async (req, res) => {
  try {
    const produtos = await listarProdutos();

    return res.json(produtos);
  } catch (error) {
    return res.status(200).send({ error: error.message });
  }
});

app.post(
  '/consulta-credito',

  check('nome', 'Nome deve ser informado').notEmpty(),
  check('CPF', 'CPF deve ser informado').notEmpty(),
  check('valor', 'O valor deve ser um número').notEmpty().isFloat(),
  check('parcelas', 'O número de parcelas deve ser um número inteiro')
    .notEmpty()
    .isInt(),

  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erro: erros.array() });
    }

    try {
      const valores = await consultaCliente.consultar(
        req.body.nome,
        req.body.CPF,
        req.body.valor,
        req.body.parcelas
      );
      return res.status(201).json(valores);
    } catch (erro) {
      return res.status(405).json({ erro: erro.message });
    }
  }
);

app.post(
  '/produto',
  check('codigo', 'O Codigo deve ser informado!').notEmpty(),
  check('descricao', 'A Descrição deve ser informada!').notEmpty(),
  check('preco').notEmpty().isFloat(),
  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erro: erros.array() });
    }

    const { codigo, descricao, preco } = req.body;

    try {
      const produto = await criarProduto(codigo, descricao, preco);

      return res.status(200).json(produto);
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  }
);

app.put(
  '/produto/:codigo',
  check('descricao', 'A Descrição deve ser informada!').notEmpty(),
  check('preco').notEmpty().isFloat(),
  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erro: erros.array() });
    }

    const { codigo } = req.params;
    const { descricao, preco } = req.body;

    try {
      const produtoAtualizado = await atualizarProduto(
        Number(codigo),
        descricao,
        preco
      );

      return res.status(200).json(produtoAtualizado);
    } catch (error) {
      return res.status(405).json({ erro: error.message });
    }
  }
);

app.delete('/produto/:codigo', async (req, res) => {
  const { codigo } = req.params;

  try {
    const produtoDeletado = await deletarProduto(Number(codigo));

    return res.status(204).end();
  } catch (error) {
    return res.status(405).json({ erro: error.message });
  }
});

module.exports = app;
