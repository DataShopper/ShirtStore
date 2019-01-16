const Sequelize = require('sequelize')
const db = require('../db')
const {stringifyPrice} = require('../../../utils')

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

    strPrice: {
      type: Sequelize.VIRTUAL,
      get() {
        return stringifyPrice(this.getDataValue('price'))
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
        product.color = product.color
          .toLowerCase()
          .replace(/,/g, '')
          .split(' ')
        product.sizes = product.sizes
          .toLowerCase()
          .replace(/,/g, '')
          .split(' ')
        product.category = product.category
          .toLowerCase()
          .replace(/,/g, '')
          .split(' ')
      },
      beforeUpdate: product => {
        product.color = product.color.toLowerCase().split(', ')
        product.sizes = product.sizes.toLowerCase().split(', ')
        product.category = product.category.toLowerCase().split(', ')
      }
    }
  }
)

Product.search = async function(term, field) {
  let result = []
  let products = await Product.findAll()
  for (let i = 0; i < products.length; i++) {
    let color = products[i][field]
    if (color.indexOf(term) > -1) {
      result.push(products[i])
    }
  }
  return result
}

module.exports = Product
