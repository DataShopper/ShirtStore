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

  // OB/MS: math and decimals are the worst (in Javascript especially) because of rounding errors in floating point math, instead the standard for currency data is to measure in cents (so use INTEGER)
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
    // OB/MS: caution with relative URLs, instead default to absolute URLs
    defaultValue: 'defaultImage1.jpeg'
  },

  description: {
    type: Sequelize.TEXT
  },

  category: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  }
})

module.exports = Product
