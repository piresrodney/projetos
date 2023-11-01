const Product = require('../models/Product')
const ProductItem = require('../models/ItemsProduct')
const formatNumber = require('number-currency-format-2')

function formatProductValue(itemsProduct) {
  for (let index = 0; index < itemsProduct.length; index++) {
    itemsProduct[index].productValue = formatNumber.format(itemsProduct[index].productValue, {
      currency: 'R$ ',
      spacing: false,
      currencyPosition: 'LEFT'
    })    
  }
}

module.exports = class ProductsController { 
  static loadCreateProducts(req, res) {
    res.render('products/create')
  }  

  static async createProduct(req, res) {
    const productName = { productName: req.body.productname }

    await Product.create(productName) 

    res.redirect('/products')
  }

  static async removeProduct(req, res) {
    const id = req.body.id

    await Product.destroy({ where: { id } })

    res.redirect('/products')
  }

  static async loadEditProdut(req, res) {
    const id = req.params.id

    const product = await Product.findOne({ where: { id }, raw: true })

    res.render('products/editproduct', { product })
  }

  static async editProduct(req, res) {
    const id = req.body.id
    const productName = { productName: req.body.productname }

    await Product.update(productName, { where: { id }})

    res.redirect('/products')
  }

  static async loadCreateItemProduct(req, res) {
    const id = req.params.id

    const product = await Product.findOne({ where: { id }, raw: true })

    res.render('products/createitemproduct', { product })                          
  }

  static async createItemProduct(req, res) {
    const productItem = {
      ProductId: req.body.ProductId,
      productSize: req.body.productSize,
      productQuantity: req.body.productQuantity,
      productValue: req.body.productValue,
      productDescription: req.body.productDescription,
    }

    await ProductItem.create(productItem)

    res.redirect('/products')
  }

  static async loadItemsProduct(req, res) {
    const productId = req.params.id    
    let itemsProduct = await ProductItem.findAll({ where: { ProductId: productId}, raw: true })

    formatProductValue(itemsProduct)

    res.render('products/allitemsproduct', { itemsProduct })
  }

  static async loadEditItemProduct(req, res) {
    const id = req.params.id

    const product = await ProductItem.findOne({ where: { id }, raw: true })
    const productName = await Product.findOne({ where: { id: product.ProductId}, raw: true})

    res.render('products/edititemproduct', { product, productName })
  }

  static async removeItemProduct(req, res) {
    const idProduct = req.body.productId
    const idItem = req.body.itemId
 
    await ProductItem.destroy({ where: { id: idItem } })

    let itemsProduct = await ProductItem.findAll({ where: { ProductId: idProduct}, raw: true })

    formatProductValue(itemsProduct)

    res.render('products/allitemsproduct', { itemsProduct })
  }

  static async editItemProduct(req, res) {
    const id = req.body.itemId
    const productId = req.body.productId

    const productItem = {
      productSize: req.body.productSize,
      productQuantity: req.body.productQuantity,
      productValue: req.body.productValue,
      productDescription: req.body.productDescription,
    }    

    await ProductItem.update(productItem, { where: { id }})

    let itemsProduct = await ProductItem.findAll({ where: { ProductId: productId}, raw: true })

    formatProductValue(itemsProduct)

    res.render('products/allitemsproduct', { itemsProduct })
  }

  static async loadProducts(req, res) {
    const products = await Product.findAll({ raw: true })

    res.render('products/all', { products })
  }
}