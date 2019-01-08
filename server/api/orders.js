const router = require('express').Router()
const {Order} = require('../db/models')
const {OrderDetail} = require('../db/models')

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
