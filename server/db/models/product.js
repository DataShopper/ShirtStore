const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define(
  'product',
  {
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
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: []
    },

    style: {
      type: Sequelize.STRING
    },

    count: {
      type: Sequelize.INTEGER
    },

    color: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: []
    },

    imageUrl: {
      type: Sequelize.STRING,
      defaultValue: '/defaultImage1.jpeg'
    },

    description: {
      type: Sequelize.TEXT
    },

    category: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      defaultValue: []
    }
  },
  {
    hooks: {
      // OB/MS: this could be a setter instead of hook
      beforeCreate: product => {
        // OB/MS: regex can be expensive to construct, define them outside the function
        product.color = product.color.replace(/,/g, '').split(' ')
        product.sizes = product.sizes.replace(/,/g, '').split(' ')
        product.category = product.category.replace(/,/g, '').split(' ')
      }
    }
  }
)

module.exports = Product
