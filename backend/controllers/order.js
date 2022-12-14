import asyncHandler from 'express-async-handler'

import Order from '../models/order.js'

// @desc Create new order
// @route POST /api/orders
// @access Public
const addOrderItems = asyncHandler( async(req, res) => {
  const { orderItems, 
    shippingAddress, 
    paymentMethod, 
    itemsPrice, 
    taxPrice, 
    shippingPrice, 
    totalPrice } = req.body

    if(orderItems && orderItems.length === 0) {
      res.status(400)
      throw new Error('No order items.')
      return 
    }
    const order = new Order({
      orderItems, 
      user: req.user._id,
      shippingAddress, 
      paymentMethod, 
      itemsPrice, 
      taxPrice, 
      shippingPrice, 
      totalPrice
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
})

// @desc Get order by Id
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler( async(req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email')

  if(!order) {
    res.status(404)
    throw new Error('Order not found.')
  }
  res.json(order)
})

// @desc Update order to paid
// @route GET /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler( async(req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, {
    $set: {
      isPaid: true,
      paidAt: Date.now(),
      paymentResult: {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address
      }
    }
  }, { new: true })

  if(!order) {
    res.status(404)
    throw new Error('Order not found.')
  }  

  res.json(order)
})

// @desc Update order to delivered
// @route GET /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler( async(req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, {
    $set: {
      isDelivered: true,
      deliveredAt: Date.now()    
    }
  }, { new: true })

  if(!order) {
    res.status(404)
    throw new Error('Order not found.')
  }

  res.json(order)
})

// @desc Get signed in user orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler( async(req, res) => {
  const orders = await Order.find({ user: req.user._id})
  
  res.json(orders)
})

// @desc Get all orders
// @route GET /api/orders
// @access Private/Admin
const getOrders = asyncHandler( async(req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  
  res.json(orders)
})

export { 
  addOrderItems, 
  getOrderById, 
  updateOrderToDelivered,
  updateOrderToPaid, 
  getMyOrders, 
  getOrders 
}