/// <reference types="@types/jest" />

const request = require('supertest');

const { app } = require('../src/app');

const { cliente, consulta, sequelize } = require('../src/db');

describe('Testes de Integração', () => {
  beforeEach(async () => {
    await cliente.destroy({ where: {} });
    await consulta.destroy({ where: {} });
  });

  afterAll(async () => sequelize.close());

  const clienteJoao = {
    Nome: 'João Silva',
    CPF: '000.000.000-00',
  };

  const resultadoEsperado = {
    montante: 106.9,
    juros: 0.025,
    parcelas: 3,
    primeiraPrestacao: 35.64,
    prestacoes: [35.64, 35.63, 35.63],
  };

  const payloadRequest = {
    nome: clienteJoao.Nome,
    CPF: clienteJoao.CPF,
    valor: 101.75,
    parcelas: 3,
  };

  test('Responder http 200 na raiz', async () => {
    return request(app)
      .get('/')
      .then(res => expect(res.status).toBe(200));
  });

  test('Responder HTTP 200 na raiz (Com Async/Await)', async () => {
    const res = await request(app).get('/');

    expect(res.status).toBe(200);
  });

  /* test('CENÁRIO 01', async () => {}); */

  test('CENÁRIO 02', async () => {
    await cliente.create(clienteJoao);
    await consulta.create({
      Valor: 1,
      NumPrestacoes: 2,
      Juros: 0.5,
      Prestacoes: '1, 1',
      clienteCPF: clienteJoao.CPF,
      Montante: 2,
      createdAt: '2016-06-22 19:10:25-07',
    });

    const res = await request(app)
      .post('/consulta-credito')
      .send(payloadRequest);

    expect(res.body).toMatchSnapshot(resultadoEsperado);
    expect(res.status).toBe(201);

    const count = await consulta.count({ where: { clientCPF: clienteJoao } });
    expect(count).toBe(2);
  });

  test('CENÁRIO 03', async () => {
    const res = await request(app)
      .post('/consulta-credito')
      .send(payloadRequest);

    expect(res.body).toMatchSnapshot(resultadoEsperado);

    const res2 = await request(app)
      .post('/consulta-credito')
      .send(payloadRequest);

    expect(res2.body.erro).toBeDefined();
    expect(res2.status).toBe(405);
  });

  test('CENÁRIO 04', async () => {
    const res = await request(app).post('/consulta-credito').send({});

    expect(res.body.erro).toBeDefined();

    expect(res.status).toBe(400);
  });
});
