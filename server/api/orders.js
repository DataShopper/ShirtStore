const router = require('express').Router()
const {Order} = require('../db/models')
const {OrderDetail} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.query.userId,
        bought: true
      },
      include: [OrderDetail]
    })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const cart = req.body
    // const orderTotal = Object.keys(cart).reduce(cartItem => cartItem.quantity
    // order.se
  } catch (error) {
    next(error)
  }
})

module.exports = router
