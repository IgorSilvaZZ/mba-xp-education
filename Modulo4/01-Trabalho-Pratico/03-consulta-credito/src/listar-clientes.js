const db = require('./db');

const listarClientes = async () => {
  const clientes = await db.cliente.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });

  return clientes;
};

module.exports = { listarClientes };
