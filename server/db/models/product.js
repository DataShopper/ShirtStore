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
      type: Sequelize.DOUBLE,
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
      beforeCreate: product => {
        product.color = product.color.replace(/,/g, '').split(' ')
        product.sizes = product.sizes.replace(/,/g, '').split(' ')
        product.category = product.category.replace(/,/g, '').split(' ')
        const price = product.price / 100
        product.price = price
      },
      beforeUpdate: product => {
        product.color = product.color.replace(/,/g, '').split(' ')
        product.sizes = product.sizes.replace(/,/g, '').split(' ')
        product.category = product.category.replace(/,/g, '').split(' ')
        const price = product.price / 100
        product.price = price
      }
    }
  }
)

module.exports = Product
