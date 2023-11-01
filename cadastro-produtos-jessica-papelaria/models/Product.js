const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Product = db.define('Product', {
  productName: {
    type: DataTypes.STRING,
    required: true
  },
})

module.exports = Product