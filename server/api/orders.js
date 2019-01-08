const router = require('express').Router()
const {Order} = require('../db/models')

router.get('/:userId/', async (req, res, next) => {
  try {
    const orders = Order.findAll({
      where: {
        userId: req.params.userId,
        bought: true
      },
      include: ['orderDetails']
    })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

module.exports = router
