const router = require('express').Router()
const {User} = require('../db/models')
const express = require('express')
const ProtectedRoutes = express.Router()
const jwt = require('jsonwebtoken')
const app = express()
const config = process.env.SESSION_SECRET || 'my best friend is Cody'
module.exports = router

// router.use('/', ProtectedRoutes)
// !!!!! NUKING THIS FOR NOW as it also interrupts the ability to update user info from the Account updater.

//--------------------------------------------------------
app.set('Secret', config) // This must be app, not router!

ProtectedRoutes.use((req, res, next) => {
  // check header for the token
  var token = req.headers['access-token']

  // decode token
  if (token) {
    console.log('TOKEN: ', token)
    // verifies secret and checks if the token is expired
    jwt.verify(token, app.get('Secret'), (err, decoded) => {
      if (err) {
        return res.json({message: 'invalid token'})
      } else {
        // if everything is good, save to request for use in other routes
        console.log('Decoded', decoded)
        req.decoded = decoded
        next()
      }
    })
  } else {
    // if there is no token

    res.send({
      message: 'No token provided.'
    })
  }
})

//--------------------------------------------------------

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.redirect('/home')
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
