const arrendodar = valor => {
  const precisao = 100;

  const arredondado =
    Math.round((valor + Number.EPSILON) * precisao) / precisao;

  return arredondado;
};

const calcularMontante = (capital, taxa, periodo) => {
  const montante = capital * Math.pow(1 + taxa, periodo - 1);

  return arrendodar(montante);
};

const calcularPrestacoes = (montante, numeroParcelas) => {
  const prestacaoBase = arrendodar(montante / numeroParcelas);

  const resultado = Array(numeroParcelas).fill(prestacaoBase);

  let somaPrestacoes = resultado.reduce((a, b) => a + b);
  let diferenca = montante - somaPrestacoes;

  const fator = diferenca > 0 ? 1 : -1;

  let i = diferenca > 0 ? 0 : resultado.length - 1;

  while (diferenca !== 0) {
    resultado[i] = arrendodar(resultado[i] + 0.01 * fator);
    somaPrestacoes = resultado.reduce((a, b) => a + b);
    diferenca = arrendodar(montante - somaPrestacoes);
    i += fator;
  }

  return resultado;
};

module.exports = { calcularMontante, arrendodar, calcularPrestacoes };
