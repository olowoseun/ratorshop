import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    })
    console.log(`MongoDB connected to ${conn.connection.host}`.cyan.underline)
  } catch (e) {
    console.error(`Error: ${e.message}`.red.underline.bold)
    process.exit(1)
  }
}

export default connectDB