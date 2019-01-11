const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  bought: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  totalPrice: {
    type: Sequelize.INTEGER
  }
})

module.exports = Order
