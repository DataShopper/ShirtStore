'use strict'

const db = require('../server/db')
const {
  User,
  Product,
  Payment,
  Order,
  OrderDetail
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Omri',
      lastName: 'Bernstein',
      role: 'user',
      address: '555 FullStack Dr.',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Molly',
      lastName: 'Seeley',
      role: 'user',
      address: '999 FullStack Dr.',
      email: 'murphy@email.com',
      password: '123'
    })
  ])

  const orders = await Promise.all([
    Order.create({
      shirts: [6],
      bought: false,
      totalPrice: 2.0,
      userId: 1
    }),
    Order.create({
      shirts: [5],
      bought: false,
      totalPrice: 5.0,
      userId: 2
    }),
    Order.create({
      shirts: [2],
      bought: true,
      totalPrice: 3.0,
      userId: 1
    }),
    Order.create({
      shirts: [3],
      bought: true,
      totalPrice: 7.0,
      userId: 2
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Funky Shirt',
      price: 9.95,
      sizes: ['S', 'M'],
      style: 'funky',
      count: 12,
      color: [
        'Red',
        'Blue',
        'Black',
        'Green',
        'Gold',
        'Orange',
        'Pink',
        'Grey',
        'Purple'
      ],
      imageUrl: 'defaultImage1.jpeg',
      description: 'This shirt is funky and you love funky.',
      category: ['Women', 'Men', 'Children']
    }),
    Product.create({
      name: 'Wacky Shirt',
      price: 8.95,
      sizes: ['S', 'M', 'L'],
      style: 'wacky',
      count: 15,
      color: ['Orange', 'Pink', 'Grey', 'Yellow', 'Purple'],
      imageUrl: 'defaultImage1.jpeg',
      description: 'This shirt is seriously wacky.',
      category: ['Women', 'Men', 'Children']
    }),
    Product.create({
      name: 'Boring Shirt',
      price: 5.95,
      sizes: ['S', 'M', 'L'],
      style: 'boring',
      count: 20,
      color: ['Orange', 'Pink', 'Grey', 'Yellow', 'Purple'],
      imageUrl: 'defaultImage1.jpeg',
      description: 'This shirt is boring.',
      category: ['Women', 'Men', 'Children']
    }),
    Product.create({
      name: 'Really Bad Shirt',
      price: 4.95,
      sizes: ['S', 'M', 'L'],
      style: 'bad',
      count: 25,
      color: [
        'Red',
        'Blue',
        'Black',
        'Green',
        'Gold',
        'Grey',
        'Yellow',
        'Purple'
      ],
      imageUrl: 'defaultImage1.jpeg',
      description: 'This shirt is really bad.',
      category: ['Men', 'Children']
    }),
    Product.create({
      name: 'Expensive Shirt',
      price: 99.95,
      sizes: ['S', 'L'],
      style: 'expensive',
      count: 10,
      color: ['Black', 'Gold'],
      imageUrl: 'defaultImage1.jpeg',
      description: 'This shirt is really pricey.',
      category: ['Women', 'Men']
    }),
    Product.create({
      name: 'Smelly Shirt',
      price: 3.95,
      sizes: ['S', 'M', 'L'],
      style: 'smelly',
      count: 5,
      color: [
        'Red',
        'Blue',
        'Black',
        'Green',
        'Gold',
        'Orange',
        'Pink',
        'Grey',
        'Yellow',
        'Purple'
      ],
      imageUrl: 'defaultImage1.jpeg',
      description: 'This shirt is really smelly.',
      category: ['Women', 'Men', 'Children']
    }),
    Product.create({
      name: 'Pretty Shirt',
      price: 29.95,
      sizes: ['S', 'M'],
      style: 'pretty',
      count: 26,
      color: [
        'Red',
        'Blue',
        'Black',
        'Green',
        'Gold',
        'Orange',
        'Pink',
        'Grey',
        'Yellow',
        'Purple'
      ],
      imageUrl: 'defaultImage1.jpeg',
      description: 'This shirt is pretty.',
      category: ['Women', 'Children']
    }),
    Product.create({
      name: 'Special Shirt',
      price: 39.95,
      sizes: ['S', 'M', 'L'],
      style: 'funkyspecial',
      count: 3,
      color: ['Red', 'Gold', 'Orange', 'Pink', 'Grey', 'Yellow', 'Purple'],
      imageUrl: 'defaultImage1.jpeg',
      description: 'This shirt is special. Stock is limited.',
      category: ['Women', 'Men', 'Children']
    })
  ])

  const orderdetails = await Promise.all([
    OrderDetail.create({
      productId: 6,
      quantity: 2,
      totalPrice: 8.9,
      size: 'Large',
      color: 'black',
      orderId: 3
    }),
    OrderDetail.create({
      productId: 2,
      quantity: 2,
      totalPrice: 18.9,
      size: 'Large',
      color: 'black',
      orderId: 3
    }),
    OrderDetail.create({
      productId: 4,
      quantity: 2,
      totalPrice: 9.9,
      size: 'Large',
      color: 'black',
      orderId: 4
    })
  ])

  const payments = await Promise.all([
    Payment.create({
      cardNumber: 9999999999991234,
      expDate: '0119',
      cvv: 999
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${payments.length} payments`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${orderdetails.length} details`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
