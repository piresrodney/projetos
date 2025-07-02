const fetch = require("node-fetch");

const API_TOKEN = "xaKhfFAyWPAhyHVFetxkuG";
const API_URL = "https://brapi.dev/api/quote";

async function fetchStockData(tag) {
  const url = `${API_URL}/${tag}?token=${API_TOKEN}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Erro ao buscar dados da API externa");
  const data = await response.json();

  if (!data.results || !data.results[0]) {
    throw new Error("Tag não encontrada ou inválida");
  }

  return data;
}

module.exports = { fetchStockData };
