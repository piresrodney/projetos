const express = require('express')
const exphbs = require('express-handlebars')
const productsRoutes = require('./routes/productsRoutes')
const conn = require('./db/conn')
const Product = require('./models/Product')
const ItemsProduct = require('./models/ItemsProduct')

const port = 3000

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('public'))

app.use('/products', productsRoutes) // Sempre deve apontar para a pasta que tem o front-end

conn
  .sync()
  // .sync({force: true})
  .then(() => {
    app.listen(port)
  })
  .catch((error) => {console.log(error)})

