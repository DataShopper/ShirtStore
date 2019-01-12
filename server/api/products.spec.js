/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    beforeEach(() => {
      return Product.create({
        name: ' Test Shirt',
        price: 2200,
        sizes: 'S, M',
        style: 'heyyyy',
        count: 11,
        color: 'Red, Blue, Black, Green, Gold, Orange, Pink, Grey, Purple',
        imageUrl: '/defaultImage1.jpeg',
        description: 'This shirt is testy and you love testy.',
        category: 'Women, Men, Children'
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0].price).to.be.equal(22)
    })
  })
})
