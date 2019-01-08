const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  price: {
    allowNull: false,
    type: Sequelize.DECIMAL(10, 2),
    validate: {
      notEmpty: true
    }
  },

  sizes: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  },

  style: {
    type: Sequelize.STRING
  },

  count: {
    type: Sequelize.STRING
  },

  color: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  },

  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'emptyimage.png'
  },

  description: {
    type: Sequelize.TEXT
  },

  category: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  }
})

module.exports = Product
