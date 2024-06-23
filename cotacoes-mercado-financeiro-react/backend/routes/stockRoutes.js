const router = require("express").Router();
const StockController = require("../controllers/stockController");

router.patch("/", StockController.getAllStocks);

router.post("/createstock", StockController.createStock);

router.delete("/removestock/:tag", StockController.removeStock);

module.exports = router;
