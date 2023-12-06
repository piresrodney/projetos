const mongoose = require('mongoose')
const { Schema } = mongoose

const Stock = mongoose.model(
  'Stock',
  new Schema({
    tag: { type: String, required: true },
    // name: { type: String, required: true },
    // perc: { type: String, required: true },
    // price: { type: String, required: true },
  })
)

module.exports = Stock