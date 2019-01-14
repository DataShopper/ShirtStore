const router = require('express').Router()
const {Order} = require('../db/models')
const {OrderDetail} = require('../db/models')

// get all api/orders?userId=5
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
    const {cart, totalPrice} = req.body
    const order = await Order.create({totalPrice})

    const orderDetails = await Promise.all(
      cart.map(cartItem =>
        OrderDetail.create({
          quantity: cartItem.quantity,
          size: cartItem.size,
          color: cartItem.color,
          totalPrice: cartItem.totalPrice
        })
      )
    )
    await order.setDetails(orderDetails)
    res.status(201).end('Order received')
  } catch (error) {
    next(error)
  }
})

module.exports = router
