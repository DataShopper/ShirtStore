const db = require('../db')
const Sequelize = require('sequelize')

const OrderDetail = db.define('orderdetail', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  totalPrice: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: null
  },
  size: {
    type: Sequelize.STRING,
    allowNull: false
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = OrderDetail
