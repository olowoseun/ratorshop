import axios from 'axios'

import * as types from '../constants/cartTypes'

export const addToCart = (id, qty) => async(dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({ 
      type: types.CART_ADD_ITEM, 
      payload: { 
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty 
      }
    }) 

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  } catch (err) {
    
  }
}

export const removeFromCart = id => async(dispatch, getState) => {
  dispatch({ type: types.CART_REMOVE_ITEM, payload: id })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = data => async(dispatch) => {
  dispatch({ type: types.CART_SAVE_SHIPPING_ADDRESS, payload: data })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = data => async(dispatch) => {
  dispatch({ type: types.CART_SAVE_PAYMENT_METHOD, payload: data })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}