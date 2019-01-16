const router = require('express').Router()
const {Product} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const result = await Product.search(req.query.term, req.query.field)
    res.json(result)
  } catch (err) {
    next(err)
  }
})

module.exports = router
