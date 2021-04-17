import * as types from '../constants/cartTypes'

const cartReducer = (state = { cartItems: [], shippingAddress: {}, paymentMethod: '' }, action) => {
  switch(action.type) {
    case types.CART_ADD_ITEM:
      const item = action.payload
      const cartWithItems = state.cartItems.find(x => x.product === item.product)

      if(cartWithItems) {
        return { 
          ...state, 
          cartItems: state.cartItems.map(x => x.product === cartWithItems.product ? item : x)
        }
      }
      return { ...state, cartItems: [...state.cartItems, item] }
    case types.CART_REMOVE_ITEM:
      return { 
        ...state,
        cartItems: state.cartItems.filter(x => x.product !== action.payload)
       }
    case types.CART_SAVE_SHIPPING_ADDRESS:
      return { 
        ...state,
        shippingAddress: action.payload,
       }
    case types.CART_SAVE_PAYMENT_METHoD:
      return { 
        ...state,
        paymentMethod: action.payload,
       }
    default:
      return state
  }
}

export default cartReducer