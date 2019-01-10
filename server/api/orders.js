const router = require('express').Router()
const {Order} = require('../db/models')
const {OrderDetail} = require('../db/models')

// OB/MS...
/*
Right now this is GET /api/orders/5 but that is potentially amibiguous, 5 there seems like an order id but is in fact a user id
So instead, it is more standard ("RESTful") to do either:
GET /api/orders?userId=5
or
GET /api/users/5/orders
Think of your route structure as documentation
*/
router.get('/:userId', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId,
        bought: true
      },
      include: [OrderDetail]
    })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

module.exports = router
