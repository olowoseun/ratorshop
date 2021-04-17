import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/user.js'

const requireAuth = asyncHandler(async (req, res, next) => {
  let token
  const authHeader = req.headers.authorization
  
  if(authHeader && authHeader.startsWith('Bearer')) {
    try {
      token = authHeader.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select('-password')
      
      next()
    } catch (err) {
      console.error(err)
      res.status(401)
      throw new Error('Not authorized, no token.')
    }
  }

  if(!token) {
    res.status(401)
    throw new Error('Not authorised. No token.')
  }
})

const isAdmin = (req, res, next) => {
  if(req.user && req.user.isAdmin) return next()
  res.status(401)
  throw new Error('Not authorised as an admin')
}

export { requireAuth, isAdmin }