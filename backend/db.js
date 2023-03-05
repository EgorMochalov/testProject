const Sequilize = require('sequelize')

module.exports = new Sequilize('testEmpty', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: 0,
  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 10000
  }
})