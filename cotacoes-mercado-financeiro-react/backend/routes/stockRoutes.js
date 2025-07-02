const router = require("express").Router();
const StockController = require("../controllers/stockController");

//middleware
const verifyToken = require("../helpers/verify-token");

router.patch("/", StockController.getAllStocks);

router.post("/createstock", verifyToken, StockController.createStock);

router.delete("/removestock", verifyToken, StockController.removeStock);

module.exports = router;
