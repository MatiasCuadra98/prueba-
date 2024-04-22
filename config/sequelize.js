const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('prueba', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
