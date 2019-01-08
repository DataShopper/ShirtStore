const User = require('./user')
const Order = require('./order')
const Product = require('./product')
const Payment = require('./payment')
const OrderDetail = require('./orderDetail')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Order.belongsTo(User) //userId in Order
User.hasMany(Order) //userId in Order

Payment.belongsTo(User) //userId in Payment
User.hasMany(Payment) //userId in Payment

OrderDetail.belongsTo(Product) //productId in OrderDetail

OrderDetail.belongsTo(Order) //orderId in OrderDetail
Order.hasMany(OrderDetail) //orderId in OrderDetail

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
