/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Produtos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      Codigo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Descricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Preco: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Produtos');
  },
};
