const Sequelize = require('sequelize')
const db = require('../db')

const Payment = db.define('payment', {
  cardNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  expDate: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  cvv: {
    type: Sequelize.STRG,
    allowNull: false,
  }
})

module.exports = Payment
