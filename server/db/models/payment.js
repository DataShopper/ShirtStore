const Sequelize = require('sequelize')
const db = require('../db')

const Payment = db.define('payment', {
  cardNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  expDate: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cvv: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
})

module.exports = Payment
