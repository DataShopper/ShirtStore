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

router.get('/search', async (req, res, next) => {
  try {
    const result = await Product.findAll({
      where: {
        color: {
          $like: ['red']
        }
      }
    })
    res.json(result)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (req.user.admin) {
      const product = await Product.create(req.body)
      res.json(product)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', async (req, res, next) => {
  try {
    if (req.user.admin) {
      const product = await Product.findById(req.params.productId)
      const updated = await product.update(req.body)
      res.sendStatus(204)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    if (req.user.admin) {
      const product = await Product.destroy({
        where: {
          id: req.params.productId
        }
      })
      res.status(200).json(product)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})
module.exports = router
