const User = require('./user')
const Order = require('./order')
const Product = require('./product')
const Payment = require('./payment')
const OrderDetail = require('orderDetail')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Order.belongsTo(User) //userId
User.hasMany(Order) //userId
Payment.belongsTo(User, {as: 'paymentId'}) //paymentId
User.hasMany(Payment) //paymentId
OrderDetail.belongsTo(Product) //productId
OrderDetail.belongsTo(Order, {as: 'cartId'}) //cartId
Order.hasMany(OrderDetail) //cartId

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Order,
  Payment,
  Product,
  OrderDetail
}
