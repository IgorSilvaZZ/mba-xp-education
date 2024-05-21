/// <reference types="@types/jest" />

const supertest = require('supertest');

const request = supertest('http://localhost:3333');

test.only('Servidor na porta 3333', async () => {
  const resposta = await request.get('/');
  expect(resposta.status).toBe(200);
});
