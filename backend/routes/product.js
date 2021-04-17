import express from 'express'

import { 
  createProduct, 
  createProductReview, 
  deleteProduct, 
  getProducts, 
  getProductById, 
  getTopProducts,
  updateProduct } from '../controllers/product.js'
import { isAdmin, requireAuth } from '../middleware/auth.js'

const router = express.Router()

router.route('/')
  .get(getProducts)
  .post(requireAuth, isAdmin, createProduct)
router.route('/:id/reviews').post(requireAuth, createProductReview)
router.get('/top', getTopProducts)
router.route('/:id')
  .get(getProductById)
  .delete(requireAuth, isAdmin, deleteProduct)
  .put(requireAuth, isAdmin, updateProduct)

export default router