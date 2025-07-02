const Stock = require("../models/Stock");
const { fetchStockData } = require("../services/stockApiService");

async function findStockByTagAndUser(tag, userId) {
  console.log(`Procurando ativo ${tag} para o usuário ${userId}`);

  return await Stock.findOne({ tag, user: { _id: userId } });
}

module.exports = class StockController {
  static async createStock(req, res) {
    const tag = req.body.stock.tagStock;
    const userId = req.body.idUser;

    if (!tag) {
      res
        .status(202)
        .json({ status: "202", message: "Informe a tag do ativo" });
      return;
    }

    const tagStock = tag.toUpperCase();

    const stockExists = await findStockByTagAndUser(tagStock, userId);

    if (stockExists) {
      res
        .status(202)
        .json({ status: "202", message: "O ativo informado já foi gravado" });
      return;
    }

    const stock = new Stock({ tag: tagStock, user: { _id: userId } });

    try {
      const newStock = await stock.save();
      res.status(201).json({
        status: "201",
        message: `Ativo ${tagStock} gravado com sucesso`,
        newStock,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
      return;
    }
  }

  static async getAllStocks(req, res) {
    const idUser = req.body.idUser;
    const stocks = await Stock.find({ "user._id": idUser });

    if (!stocks) {
      res.status(202).json({
        message: "Não foram encontradas ações ou FIIs",
      });
      return;
    }

    const stocksView = await Promise.all(
      stocks.map(async (stock) => {
        try {
          const data = await fetchStockData(stock.tag);
          const result = data.results[0];
          return {
            id: stock.tag,
            tag: result.symbol,
            name: result.longName.substr(0, 35),
            perc: result.regularMarketChangePercent
              .toFixed(2)
              .replace(".", ","),
            price: result.regularMarketPrice.toFixed(2).replace(".", ","),
          };
        } catch {
          return {
            id: stock.tag,
            tag: stock.tag,
            name: "Houve algum problema no retorno do ativo",
            perc: "0,00",
            price: "0,00",
          };
        }
      })
    );

    res.status(200).json({
      stocksView,
    });
  }

  static async removeStock(req, res) {
    const tag = req.body.tagStock;
    const userId = req.body.idUser;

    const stockExists = await findStockByTagAndUser(tag, userId);

    if (!stockExists) {
      res.status(404).json({
        message: "Não foi encontrado ativo para realizar a exclusão",
      });
      return;
    }

    try {
      await Stock.findOneAndDelete({ tag, user: { _id: userId } });
      res.status(200).json({ message: `Ativo ${tag} excluído com sucesso` });
    } catch (error) {
      res.status(500).json({ message: error.message });
      return;
    }
  }
};
