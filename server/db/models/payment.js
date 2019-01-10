const Sequelize = require('sequelize')
const db = require('../db')

// OB/MS: you might find you don't need this model, stripe will probably take care of it
const Payment = db.define('payment', {
  // OB/MS: watch out storing credit card info
  cardNumber: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  expDate: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cvv: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Payment
