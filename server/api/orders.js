const router = require('express').Router()
const {Order} = require('../db/models')
const {OrderDetail} = require('../db/models')

// get all api/orders?userId=5
router.get('/', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {
        userId: req.query.userId
      },
      include: [{model: OrderDetail, as: 'details'}]
    })
    order.sort((a, b) => {
      return b.id - a.id
    })
    res.json(order)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {cart, total, userId} = req.body
    const totalPrice = total
    console.log(req.body)
    const order = await Order.create({totalPrice, userId})
    const orderDetails = await Promise.all(
      cart.map(cartItem =>
        OrderDetail.create({
          quantity: cartItem.quantity,
          size: cartItem.size,
          color: cartItem.color,
          totalPrice: cartItem.totalPrice,
          productId: cartItem.productId,
          imageUrl: cartItem.imageUrl
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
