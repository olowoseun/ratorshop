import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'

import users from './data/users.js'
import products from './data/products.js'

import User from './models/user.js'
import Product from './models/product.js'
import Order from './models/order.js'

import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const newUsers = await User.insertMany(users)
    const adminUser = newUsers[0]._id

    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser}
    })
    await Product.insertMany(sampleProducts)

    console.log(`Data imported!`.green.inverse)
    process.exit()
  } catch (e) {
    console.error(`${e}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log(`Data destroyed!`.red.inverse)
    process.exit()
  } catch (e) {
    console.error(`${e}`.red.inverse)
    process.exit(1)
  }
}

if(process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}