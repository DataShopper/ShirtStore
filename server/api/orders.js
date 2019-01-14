const router = require('express').Router()
const {Order} = require('../db/models')
const {OrderDetail} = require('../db/models')

// get all api/orders?userId=5
router.get('/', async (req, res, next) => {
  try {
    // OB/MS: access control
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
    // OB/MS: if you find your route handlers getting larger think about refactoring, here maybe you could define a "checkout" method on order model
    const {cart, totalPrice} = req.body
    const order = await Order.create({totalPrice})

    // OB/MS: nested "eager" create with include (kinda neat)
    /*
    Order.create({
      whatever,
      orderDetails: [{
        otherStuff
      }]
    }, {
      include: [OrderDetail]
    })
    */
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
