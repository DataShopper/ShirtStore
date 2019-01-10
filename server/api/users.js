const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/account', async (req, res, next) => {
  try {
    const response = await User.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName
      },
      {
        where: {
          id: req.body.id
        },
        returning: true,
        plain: true
      }
    )
    return res.status(200).send('Updated.')
  } catch (err) {
    next(err)
  }
})
