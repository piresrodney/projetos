const Stock = require("../models/Stock");

module.exports = class StockController {
  static async createStock(req, res) {
    const tag = req.body.stock.tagStock;
    const userLogged = req.body.idUser;

    if (!tag) {
      res
        .status(202)
        .json({ status: "202", message: "Informe a tag do ativo" });
      return;
    }

    const tagStock = tag.toUpperCase();

    const stockExists = await Stock.findOne({
      tag: tagStock,
      user: userLogged,
    });

    if (stockExists) {
      res
        .status(202)
        .json({ status: "202", message: "O ativo informado já foi gravado" });
      return;
    }

    const stock = new Stock({ tag: tagStock, user: userLogged });

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

    const url = Array();
    const stocksView = Array();
    const tagArray = Array();

    stocks.map((element) => {
      url.push(
        `https://brapi.dev/api/quote/${element.tag}?token=xaKhfFAyWPAhyHVFetxkuG`
      );

      tagArray.push(element.tag);
    });

    let index = 0;
    for (const urlItem of url.entries()) {
      const response = await fetch(urlItem[1]);
      const data = await response.json();

      try {
        const returnApi = {
          id: stocks[index]._id,
          tag: data.results[0].symbol,
          name: data.results[0].longName.substr(0, 35),
          perc: data.results[0].regularMarketChangePercent
            .toFixed(2)
            .replace(".", ","),
          price: data.results[0].regularMarketPrice
            .toFixed(2)
            .replace(".", ","),
        };

        stocksView.push(returnApi);
      } catch (error) {
        const returnError = {
          id: tagArray[index],
          tag: tagArray[index],
          name: "Houve algum problema no retorno do ativo",
          perc: "0,00",
          price: "0,00",
        };

        stocksView.push(returnError);
      }

      index++;
    }

    res.status(200).json({
      stocksView,
    });
  }

  static async removeStock(req, res) {
    const tag = req.params.tag;

    const stockExists = await Stock.findOne({ tag });

    if (!stockExists) {
      res.status(202).json({
        message: "Não foi encontrado ativo para realizar a exclusão",
      });
      return;
    }

    try {
      await Stock.findOneAndDelete({ tag });
      res.status(200).json({ message: `Ativo ${tag} excluído com sucesso` });
    } catch (error) {
      res.status(500).json({ message: error.message });
      return;
    }
  }
};
