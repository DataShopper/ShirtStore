const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Order = db.model('order')
const OrderDetail = db.model('orderdetail')

describe('Orders routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  //Get all orders /api/orders/:userId
  describe('/api/orders/:userId', () => {
    const testEmail = 'anna@puppybook.com'
    const testPW = '1234'

    beforeEach(() => {
      User.create({
        email: testEmail,
        password: testPW
      })
      Order.create({
        bought: true,
        totalPrice: 13.0,
        userId: 3 //only works when there are two users already in db
      })
      OrderDetail.create(
        {
          productId: 2,
          quantity: 1,
          totalPrice: 3.0,
          size: 'M',
          color: 'green',
          orderId: 5 //only works when there are 4 orders users already in db
        },
        {
          productId: 3,
          quantity: 1,
          totalPrice: 4.0,
          size: 'L',
          color: 'blue',
          orderId: 5 //only works when there are 4 orders already in db
        }
      )
    })

    afterEach(() => {
      OrderDetail.destroy({
        where: {
          orderId: 3
        }
      })
      Order.destroy({
        where: {
          userId: 5
        }
      })
      User.destroy({
        where: {
          email: testEmail
        }
      })
    })

    it('GET /api/orders/:userId', async () => {
      const res = await request(app)
        .get('/api/orders/:userId')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(testEmail)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
