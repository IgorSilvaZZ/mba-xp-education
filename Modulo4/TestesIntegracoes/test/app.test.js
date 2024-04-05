/// <reference types="@types/jest" />

const request = require('supertest');

const { app } = require('../src/app');

describe('Testes de Integração', () => {
  test('Responder http 200 na raiz', async () => {
    return request(app)
      .get('/')
      .then(res => expect(res.status).toBe(200));
  });

  test('Responder HTTP 200 na raiz (Com Async/Await)', async () => {
    const res = await request(app).get('/');

    expect(res.status).toBe(200);
  });
});
