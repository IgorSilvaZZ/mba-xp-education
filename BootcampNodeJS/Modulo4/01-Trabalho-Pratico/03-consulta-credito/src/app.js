const express = require('express');

const app = express();

const { check, validationResult } = require('express-validator');

const { consultar } = require('./consulta-cliente');
const { listarClientes } = require('./listar-clientes');

app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).send('Bootcamp desenvolvedor back end - Tópicos especiais!');
});

app.get('/cliente', async (req, res) => {
  const clientes = await listarClientes();

  return res.json(clientes);
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
      const valores = await consultar(
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

module.exports = app;
