const bcrypt = require("bcrypt");

async function criptograph(password) {
  let hash = "";
  try {
    hash = await bcrypt.hash(password, 10);
  } catch (error) {
    console.log("Erro ao criptografar senha");
  }

  return hash;
}

module.exports = criptograph;
