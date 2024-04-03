/// <reference types="@types/jest" />

const {
  calcularMontante,
  arrendodar,
  calcularPrestacoes,
} = require('../src/calcula-valor');

describe('Arrendondar', () => {
  test('Arrendodar em duas casas decimais', () => {
    const resultado = arrendodar(538.4453124999998);

    expect(resultado).toBe(538.45);
  });

  test('1.005 deve retornar 1.01', () => {
    const resultado = arrendodar(1.005);

    expect(resultado).toBe(1.01);
  });
});

describe('Calcular Montante', () => {
  test('Com uma prestão, o montante é igual ao capital', () => {
    const montante = calcularMontante(100, 0.0175, 1);

    // Resultado ou Comportamento esperado
    expect(montante).toBe(100);
  });

  test('Com 4 prestações o montate é acrescido de juros', () => {
    const montante = calcularMontante(500, 0.025, 4);

    // Resultado ou Comportamento esperado
    expect(montante).toBe(538.45);
  });
});

describe('calcularPrestacoes', () => {
  test('O número de parcelas é igual ao número de prestações', () => {
    // Premissas
    const numeroPrestacoes = 6;

    // Operação
    const prestacoes = calcularPrestacoes(200, numeroPrestacoes);

    // Resultado esperado
    expect(prestacoes.length).toBe(numeroPrestacoes);
  });

  test('Uma unica prestação, valor igual ao montante', () => {
    const numeroPrestacoes = 1;

    const prestacoes = calcularPrestacoes(50, numeroPrestacoes);

    expect(prestacoes.length).toBe(numeroPrestacoes);
    expect(prestacoes[0]).toBe(50);
  });

  test('Duas prestação, o valor é igual á metade do montante', () => {
    const numeroPrestacoes = 2;

    const prestacoes = calcularPrestacoes(50, numeroPrestacoes);

    expect(prestacoes.length).toBe(numeroPrestacoes);
    expect(prestacoes[0]).toBe(25);
    expect(prestacoes[1]).toBe(25);
  });

  test('O valor da soma das prestações deve ser igual ao montate com duas casas decimais', () => {
    // Dado (given)
    const numeroPrestacoes = 3;
    const montante = 100;

    // Quando (when)
    const prestacoes = calcularPrestacoes(montante, numeroPrestacoes);

    // Então (then)
    expect(prestacoes.length).toBe(numeroPrestacoes);

    const soma = arrendodar(prestacoes[0] + prestacoes[1] + prestacoes[2]);

    expect(soma).toBe(montante);
  });
});
