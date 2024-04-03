/// <reference types="@types/jest" />

const { calcularMontante, arrendodar } = require('../src/calcula-valor');

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
