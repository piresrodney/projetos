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