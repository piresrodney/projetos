const express = require('express')
const router = express.Router()
const StockController = require('../controllers/stocksController')

router.get('/', StockController.showStocks)
router.get('/createstocks', StockController.createStockRender)
router.get('/infostock', StockController.infoStock)

router.post('/createstocks', StockController.createStock)

module.exports = router