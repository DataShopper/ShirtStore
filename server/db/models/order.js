const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  shirts: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: []
  },
  bought: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  totalPrice: {
    type: Sequelize.DECIMAL(10, 2)
  }
})

module.exports = Order
