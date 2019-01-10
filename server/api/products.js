const router = require('express').Router()
const {Product} = require('../db/models')

//Get all products /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    console.log('id', req.params.productId)
    const product = await Product.findById(req.params.productId)
    res.json(product)
  } catch (err) {
    next(err)
  }
})
module.exports = router
