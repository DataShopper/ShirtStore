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
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true
    }
  },

  sizes: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },

  style: {
    type: Sequelize.STRING
  },

  count: {
    type: Sequelize.INTEGER
  },

  color: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },

  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/defaultImage1.jpeg'
  },

  description: {
    type: Sequelize.TEXT
  },

  category: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  }
})

module.exports = Product
