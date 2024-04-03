const arrendodar = (valor) => {
  const precisao = 100;

  const arredondado = Math.round(valor * precisao) / precisao;

  return arredondado;
};

const calcularMontante = (capital, taxa, periodo) => {
  const montante = capital * Math.pow(1 + taxa, periodo - 1);

  return arrendodar(montante);
};

module.exports = { calcularMontante, arrendodar };
