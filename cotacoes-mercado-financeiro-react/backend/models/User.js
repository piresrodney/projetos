const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = mongoose.model(
  "User",
  new Schema(
    {
      name: { type: String, require: true },
      nickname: { type: String, require: true },
      email: { type: String, require: true },
      password: { type: String, require: true },
    },
    { timestamps: true }
  )
);

module.exports = User;
