const express = require('express')
const router = express.Router()
const ProductsController = require('../controllers/ProductsController')

router.get('/add', ProductsController.loadCreateProducts)
router.get('/editproduct/:id', ProductsController.loadEditProdut)
router.get('/createitemproduct/:id', ProductsController.loadCreateItemProduct)
router.get('/edititemproduct/:id', ProductsController.loadEditItemProduct)
router.get('/allitemsproduct/:id', ProductsController.loadItemsProduct)
router.get('/', ProductsController.loadProducts)

router.post('/add', ProductsController.createProduct)
router.post('/remove', ProductsController.removeProduct)
router.post('/removeitem', ProductsController.removeItemProduct)
router.post('/editproduct', ProductsController.editProduct)
router.post('/edititemproduct', ProductsController.editItemProduct)
router.post('/createitemproduct', ProductsController.createItemProduct)

module.exports = router