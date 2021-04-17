import express from 'express'
import { isAdmin, requireAuth } from '../middleware/auth.js'
import { 
  addOrderItems, 
  getOrderById, 
  updateOrderToDelivered,
  updateOrderToPaid, 
  getMyOrders, getOrders } from '../controllers/order.js'

const router = express.Router()

router.route('/')
  .post(requireAuth, addOrderItems)
  .get(requireAuth, isAdmin, getOrders)
router.route('/myorders').get(requireAuth, getMyOrders)
router.route('/:id').get(requireAuth, getOrderById)
router.route('/:id/pay').put(requireAuth, updateOrderToPaid)
router.route('/:id/deliver').put(requireAuth, isAdmin, updateOrderToDelivered)

export default router