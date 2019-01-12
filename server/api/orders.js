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

module.exports = router
