const { calcularMontante, calcularPrestacoes } = require('./calcula-valor');

const { cliente, consulta, sequelize } = require('./db');

const juros = 0.025;

const consultar = async (nome, CPF, valor, parcelas) => {
  let clienteExiste = await cliente.findOne({
    where: { CPF },
  });

  if (clienteExiste == null) {
    clienteExiste = await cliente.create({
      Nome: nome,
      CPF,
    });
  }

  const ultimaConsulta = await consulta.findOne({
    where: { ClienteCPF: CPF },
    order: [[sequelize.col('createdAt'), 'DESC']],
  });

  if (ultimaConsulta) {
    const diferenca = Math.abs(
      // eslint-disable-next-line comma-dangle
      ultimaConsulta.createdAt.getTime() - new Date().getTime()
    );
    const diferencaDias = Math.round(diferenca / (1000 * 60 * 60 * 24));

    if (diferencaDias <= 30) {
      throw new Error(`Última consula realizada há ${diferencaDias} dias`);
    }
  }

  const montante = calcularMontante(valor, juros, parcelas);
  const prestacoes = calcularPrestacoes(montante, parcelas);

  const novaConsulta = {
    Valor: valor,
    NumPrestacoes: parcelas,
    Juros: juros,
    Prestacoes: prestacoes.join(', '),
    ClienteCPF: cliente.CPF,
    Montante: montante,
  };

  await consulta.create(novaConsulta);

  return {
    montante,
    juros,
    parcelas: prestacoes.length,
    primeiraPrestacao: prestacoes[0],
    prestacoes,
  };
};

module.exports = {
  consultar,
};
