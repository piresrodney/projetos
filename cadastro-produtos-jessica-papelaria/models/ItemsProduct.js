const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Product = require('./Product')

const ItemsProduct = db.define('ItemsProduct', {
  productSize: {
    type: DataTypes.STRING,
    required: true
  },
  productQuantity: {
    type: DataTypes.INTEGER,
    required: true
  },
  productValue: {
    type: DataTypes.DOUBLE,
    required: true
  },
  productDescription: {
    type: DataTypes.STRING,
    required: false
  },
})

ItemsProduct.belongsTo(Product) // Relacionamento entre tabelas

module.exports = ItemsProduct