import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true
      },
      qty: {
        type: Number,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
      }
    }
  ],
  shippingAddress: {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  paymentMethod: {
    type: String,
    required: true
  },
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String
  },
  taxPrice: {
    type: Number,
    reequired: true,
    default: 0.0
  },
  shippingPrice: {
    type: Number,
    reequired: true,
    default: 0.0
  },
  totalPrice: {
    type: Number,
    reequired: true,
    default: 0.0
  },
  isPaid: {
    type: Boolean,
    reequired: true,
    default: false
  },
  paidAt: Date,
  deliveredAt: Date,
  isDelivered: {
    type: Boolean,
    required: true,
    default: false
  }
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema)

export default Order