/// <reference types="@types/jest" />

const request = require('supertest');

const app = require('../src/app');
const db = require('../src/db');

describe('Testes de Integração', () => {
  beforeEach(async () => {
    await db.cliente.destroy({ where: {} });
    await db.consulta.destroy({ where: {} });
  });

  afterAll(async () => db.sequelize.close());

  const clienteJoao = {
    Nome: 'João Silva',
    CPF: '000.000.000-00',
  };

  const clientIgor = {
    Nome: 'Igor Silva',
    CPF: '524.888.190-00',
  };

  const clientBia = {
    Nome: 'Beatriz Dos Santos Silva',
    CPF: '386.193.850-20',
  };

  const resultadoEsperado = {
    montante: 106.9,
    juros: 0.025,
    parcelas: 3,
    primeiraPrestacao: 35.64,
    prestacoes: [35.64, 35.63, 35.63],
  };

  const resultadoEsperadoClientes = [
    {
      CPF: '386.193.850-20',
      Nome: 'Beatriz Dos Santos Silva',
    },
    {
      CPF: '524.888.190-00',
      Nome: 'Igor Silva',
    },
  ];

  const payloadRequest = {
    nome: clienteJoao.Nome,
    CPF: clienteJoao.CPF,
    valor: 101.75,
    parcelas: 3,
  };

  test('responder http 200 na raiz - Versão 01', () =>
    request(app)
      .get('/')
      .then(res => expect(res.status).toBe(200)));

  test('responder http 200 na raiz - Versão 02', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
  });

  // O teste abaixo está errando, porém passando com sucesso, pois não suporta
  // o comportamento assíncrono da chamada HTTP realizada. O mesmo deveria
  // falhar, uma vez que a aplicação retorna HTTP 200,
  // ao passo que o teste está aguardando um HTTP 400.
  //
  // test('responder http 200 na raiz - Versão COM ERRO', () => {
  //   request(app).get('/')
  //     .then((res) => expect(res.status).toBe(400));
  // });

  test('Listando todos os clientes persistidos na base', async () => {
    await db.cliente.create(clientBia);
    await db.cliente.create(clientIgor);

    const res = await request(app).get('/cliente');

    const response = res.body;

    expect(res.status).toBe(200);
    expect(res.type).toBe('application/json');
    expect(response).toMatchSnapshot(resultadoEsperadoClientes);
  });

  test('CENÁRIO 01', async () => {
    const res = await request(app)
      .post('/consulta-credito')
      .send(payloadRequest);

    // Resultado é obtido com sucesso
    expect(res.body.erro).toBeUndefined();
    expect(res.body.montante).toBe(106.9);
    expect(res.status).toBe(201);
    expect(res.body).toMatchSnapshot(resultadoEsperado);
    expect(res.body).toMatchObject(resultadoEsperado);

    // Cliente foi armazenado
    const cliente = await db.cliente.findOne({
      where: { CPF: clienteJoao.CPF },
    });
    expect(cliente.CPF).toBe(clienteJoao.CPF);

    const consulta = await db.consulta.findOne({
      where: { clienteCPF: clienteJoao.CPF },
    });

    expect(consulta.Valor).toBe(101.75);
  });

  test('CENÁRIO 02', async () => {
    await db.cliente.create(clienteJoao);
    await db.consulta.create({
      valor: 1,
      numPrestacoes: 2,
      juros: 0.5,
      prestacoes: '1, 1',
      clienteCPF: clienteJoao.CPF,
      montante: 2,
      createdAt: '2016-06-22 19:10:25-07',
    });

    const res = await request(app)
      .post('/consulta-credito')
      .send(payloadRequest);
    expect(res.body).toMatchSnapshot(resultadoEsperado);
    expect(res.status).toBe(201);

    const count = await db.consulta.count({
      where: { clienteCPF: clienteJoao.CPF },
    });
    expect(count).toBe(2);
  });

  test('CENÁRIO 03', async () => {
    const res1 = await request(app)
      .post('/consulta-credito')
      .send(payloadRequest);

    expect(res1.body).toMatchSnapshot(resultadoEsperado);

    const res2 = await request(app)
      .post('/consulta-credito')
      .send(payloadRequest);

    // Resultado é obtido
    expect(res2.body.erro).toBeDefined();
    expect(res2.status).toBe(405);
  });

  test('CENÁRIO 04', async () => {
    const res = await request(app).post('/consulta-credito').send({});

    // Resultado é obtido
    expect(res.body.erro).toBeDefined();
    expect(res.status).toBe(400);
  });
});
