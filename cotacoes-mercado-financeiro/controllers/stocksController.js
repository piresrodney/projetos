const Stock = require('../models/Stock')

const currencyURL = 'https://economia.awesomeapi.com.br/json/last/USD-BRL'

module.exports = class StockController {

  static async showStocks(req, res) {
    const stocks = await Stock.find().lean()
    
    const currencyResponse = await fetch(currencyURL)
    const currencyData = await currencyResponse.json()
    const dollarText = currencyData.USDBRL.bid
    const dollarValue = Number(dollarText).toFixed(2).replace('.', ',')    

    let url = Array()
    const stocksView = Array()    
    
    stocks.forEach(element => { 
      url.push(`https://brapi.dev/api/quote/${element.tag}?token=xaKhfFAyWPAhyHVFetxkuG`)       
    })

    for (const urlItem of url.entries()) {    
      const response = await fetch(urlItem[1])
      const data = await response.json()
      const returnApi = { 
        tag: data.results[0].symbol, 
        name: data.results[0].longName.substr(0, 35), 
        perc: data.results[0].regularMarketChangePercent.toFixed(2).replace('.', ','), 
        price: data.results[0].regularMarketPrice.toFixed(2).replace('.', ',')
      }

      stocksView.push(returnApi)
    } 

    res.render('stocks/all', { stocksView, dollarValue })    
  }

  static async createStock(req, res) {
    const tag = req.body.tagStock.toUpperCase()   
    // const name = 'Nome retornado da API'
    // const perc = 'Percentual retornado da API'
    // const price = 'Preço retornado da API'
    
    // const stock = new Stock({ tag, name, perc, price })
    const stock = new Stock({ tag })

    await stock.save()

    res.redirect('/stocks')
  }
}