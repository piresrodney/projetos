const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

const app = express()
const stockRoutes = require('./routes/stocksRoutes')
// const currencyDolar = require('./api/currency_dollar')

const port = 8080

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.use(express.static('public'))

app.use('/stocks', stockRoutes)

app.listen(port)

// app.get('/', (req, res) => {
//   const stocks = [ 
//     { 
//       tag: "PETR4",
//       name: 'Petrobras',
//       perc: '20%',
//       price: '33.00'
//     }, 
//     { 
//       tag: "BBAS3",
//       name: 'Banco do Brasil',
//       perc: '-25%',
//       price: '47.00'
//     }, 
//     { 
//       tag: "MXRF11",
//       name: 'Maxxi Renda',
//       perc: '0%',
//       price: '10.00'
//     },
//   ]  

//   res.render('home', { stocks })
// })

// app.post('/poststocks', (req, res) => {
//   const stocks = req.body.stocks

//   console.log(stocks)
//   res.redirect('/')
// })

// app.listen(port, () => {
//   console.log(currencyDolar())
//   console.log(`~> App para cotação de ativos rodando na porta ${port} <~`)
// })