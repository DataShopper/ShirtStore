const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/orders/', () => {
    beforeEach(() => {
      return Order.create({
        bought: true,
        totalPrice: 10,
        id: 1
      })
    })

    xit('GET /api/orders/ by userid querystrings??', async () => {
      const res = await request(app)
        .get('/api/orders?userId=1')
        .expect(200)
      console.log(res.body, 'order res')
      expect(res.body).to.be.an('array')
      expect(res.body[0].bought).to.be.equal(true)
    })
  })
})
