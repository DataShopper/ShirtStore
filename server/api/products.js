const router = require('express').Router()
const {Product} = require('../db/models')
const session = require('express-session')

router.use(
  session({
    genid: req => {
      console.log('genid', genuuid())
      return genuuid()
    },
    secret: 'My best friend is Cody'
  })
)

//Get all products /api/products
router.get('/', async (req, res, next) => {
  try {
    console.log('HELLO', req.session.user)
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const products = await Product.findById(req.params.productId)
    res.json(products)
  } catch (err) {
    next(err)
  }
})
module.exports = router
