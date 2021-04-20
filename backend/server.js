import express from 'express'
import morgan from 'morgan'
import path from 'path'
import dotenv from 'dotenv'
import colors from 'colors'

import productRouter from './routes/product.js'
import userRouter from './routes/user.js'
import orderRouter from './routes/order.js'
import uploadRouter from './routes/upload.js'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

const app = express()
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

connectDB()

const PORT = process.env.PORT || 5000

dotenv.config()

app.use(express.json())
app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)
app.use('/api/uploads', uploadRouter)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
}

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))