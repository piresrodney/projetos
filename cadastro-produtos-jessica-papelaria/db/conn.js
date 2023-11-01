require('dotenv').config()
const { Sequelize } = require('sequelize')
const dialectDB = 'mysql'

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  'root', 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: dialectDB
  }
)

try {
  sequelize.authenticate()
  console.log(`Conectado ao ${dialectDB.toUpperCase()} com sucesso!`)
} catch (error) {
  console.log(`Não foi possível conectar: ${error}`)
}  

module.exports = sequelize