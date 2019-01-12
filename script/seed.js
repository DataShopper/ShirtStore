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
      admin: true,
      address: '555 FullStack Dr.',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Molly',
      lastName: 'Seeley',
      admin: false,
      address: '999 FullStack Dr.',
      email: 'murphy@email.com',
      password: '123'
    })
  ])

  const orders = await Promise.all([
    Order.create({
      bought: false,
      totalPrice: 200,
      userId: 1
    }),
    Order.create({
      bought: false,
      totalPrice: 500,
      userId: 2
    }),
    Order.create({
      bought: true,
      totalPrice: 300,
      userId: 1
    }),
    Order.create({
      bought: true,
      totalPrice: 700,
      userId: 2
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Funky Shirt',
      price: 995,
      sizes: 'S, M',
      style: 'funky',
      count: 12,
      color: 'Red, Blue, Black, Green, Gold, Orange, Pink, Grey, Purple',
      imageUrl: '/defaultImage1.jpeg',
      description: 'This shirt is funky and you love funky.',
      category: 'Women, Men, Children'
    }),
    Product.create({
      name: 'Wacky Shirt',
      price: 895,
      sizes: 'M, L',
      style: 'wacky',
      count: 15,
      color: 'Orange, Pink, Grey, Yellow, Purple',
      imageUrl: '/defaultImage1.jpeg',
      description: 'This shirt is seriously wacky.',
      category: 'Women, Men, Children'
    }),
    Product.create({
      name: 'Boring Shirt',
      price: 595,
      sizes: 'S, M, L',
      style: 'boring',
      count: 20,
      color: 'Orang, Pink, Grey, Yellow, Purple',
      imageUrl: '/defaultImage1.jpeg',
      description: 'This shirt is boring.',
      category: 'Women, Men, Children'
    }),
    Product.create({
      name: 'Really Bad Shirt',
      price: 495,
      sizes: 'S, M, L',
      style: 'bad',
      count: 25,
      color: 'Red, Gold, Blue, Green, Yellow, Pink, Rose',
      imageUrl: '/defaultImage1.jpeg',
      description: 'This shirt is really bad.',
      category: 'Men, Children'
    }),
    Product.create({
      name: 'Expensive Shirt',
      price: 9995,
      sizes: 'S, L',
      style: 'expensive',
      count: 10,
      color: 'Black, Gold',
      imageUrl: '/defaultImage1.jpeg',
      description: 'This shirt is really pricey.',
      category: 'Women, Men'
    }),
    Product.create({
      name: 'Smelly Shirt',
      price: 395,
      sizes: 'S, M, L',
      style: 'smelly',
      count: 5,
      color: 'Red, Gold, Blue, Green, Purple, Yellow',
      imageUrl: '/defaultImage1.jpeg',
      description: 'This shirt is really smelly.',
      category: 'Women, Men, Children'
    }),
    Product.create({
      name: 'Pretty Shirt',
      price: 2995,
      sizes: 'S, M',
      style: 'pretty',
      count: 26,
      color: 'Red, Gold, Blue, Green, Black, White',
      imageUrl: '/defaultImage1.jpeg',
      description: 'This shirt is pretty.',
      category: 'Women, Children'
    }),
    Product.create({
      name: 'Special Shirt',
      price: 3995,
      sizes: 'S, M, L',
      style: 'funkyspecial',
      count: 3,
      color: 'Red, Gold, Blue, Green',
      imageUrl: '/defaultImage1.jpeg',
      description: 'This shirt is special. Stock is limited.',
      category: 'Women, Men, Children'
    })
  ])

  const orderdetails = await Promise.all([
    OrderDetail.create({
      productId: 6,
      quantity: 2,
      totalPrice: 890,
      size: 'Large',
      color: 'black',
      orderId: 3
    }),
    OrderDetail.create({
      productId: 2,
      quantity: 2,
      totalPrice: 1890,
      size: 'Large',
      color: 'black',
      orderId: 3
    }),
    OrderDetail.create({
      productId: 4,
      quantity: 2,
      totalPrice: 990,
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

  // console.log(`seeded ${users.length} users`)
  // console.log(`seeded ${products.length} products`)
  // console.log(`seeded ${payments.length} payments`)
  // console.log(`seeded ${orders.length} orders`)
  // console.log(`seeded ${orderdetails.length} details`)
  // console.log(`seeded successfully`)
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
