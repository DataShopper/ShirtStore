const Sequelize = require('sequelize')
const db = require('../db')

const Products = db.define('products', {
  name: {
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  price: {
    allowNull: false,
    type: Sequelize.DECIMAL,
    validate: {
      notEmpty: true,
    },
  },

  sizes: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['S', 'M','L' ]],
    },
  },

  style: {
    type: Sequelize.STRING
  },

  count: {
    type: Sequelize.STRING
  },

  color: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['Red', 'Blue','Black', 'Green', 'Gold','Orange', 'Pink', 'Grey', 'Yellow','Purple']],
    },
  },

  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "emptyimage.png"
  },

  description: {
    type: Sequelize.TEXT,
  },

  category: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['Women', 'Men','Children' ]],
    },
  },
})

module.exports = Products




