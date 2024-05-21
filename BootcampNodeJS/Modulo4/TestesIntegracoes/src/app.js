/* eslint-disable comma-dangle */

const express = require('express');
const { check, validationResult } = require('express-validator');

const { consultar } = require('./consulta-cliente');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('OK');
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

    const { nome, CPF, valor, parcelas } = req.body;

    try {
      const valores = await consultar(nome, CPF, valor, parcelas);
      return res.status(201).json(valores);
    } catch (erro) {
      return res.status(405).json({ erro: erro.message });
    }
  }
);

module.exports = { app };
