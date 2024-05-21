const { app } = require('./app');

const { sequelize } = require('./db');

sequelize.sync().then(async () => {
  await console.log('Conectado ao banco de dados!');
});

app.listen(3333, () => console.log('Server is running!'));
