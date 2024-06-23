const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Stock = mongoose.model(
  "Stock",
  new Schema(
    {
      tag: { type: String, required: true },
      user: Object,
    },
    { timestamps: true }
  )
);

module.exports = Stock;
