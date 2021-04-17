import { combineReducers } from 'redux'
import { 
  productListReducer as productList, 
  productCreateReducer as productCreate,
  productCreateReviewReducer as productCreateReview,
  productDeleteReducer as productDelete,
  productDetailsReducer as productDetails,
  productUpdateReducer as productUpdate,
  topRatedProductReducer as topRatedProduct 
} from './productReducers'
import cart from './cartReducers'
import { 
  userSigninReducer as userSignin, 
  userSignupReducer as userSignup, 
  userDeleteReducer as userDelete,
  userDetailsReducer as userDetails,
  userListReducer as userList,
  userUpdateReducer as userUpdate,
  userUpdateProfileReducer as userUpdateProfile 
} from './userReducers'
import { 
  creareOrderReducer as createOrder, 
  orderListReducer as orderList,
  orderDetailsReducer as orderDetails,
  orderDeliverReducer as orderDeliver,
  orderPayReducer as orderPay,
  myOrderListReducer as myOrderList } from './orderReducers'

const rootReducer = combineReducers({
  cart,
  createOrder,
  myOrderList,
  orderDeliver,
  orderDetails,
  orderList,
  orderPay,
  productCreate,
  productCreateReview,
  productDelete,
  productList,
  productDetails,
  productUpdate,
  topRatedProduct,
  userDelete,
  userDetails,
  userList,
  userUpdate,
  userSignin,
  userSignup,
  userUpdateProfile
})

export default rootReducer