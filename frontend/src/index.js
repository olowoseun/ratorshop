import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './bootstrap.min.css'
import './index.css';
import App from './App';
import configureStore from './redux/configureStore'
import reportWebVitals from './reportWebVitals';

const localStorageCartItems = localStorage.getItem('cartItems')
const localStorageUserInfo = localStorage.getItem('userInfo')
const localStorageShippingAddress = localStorage.getItem('shippingAddress')

const cartItemsFromStorage = localStorageCartItems ? JSON.parse(localStorageCartItems) : [] 
const userInfoFromStorage = localStorageUserInfo ? JSON.parse(localStorageUserInfo) : null
const shippingAddressFromStorage = localStorageShippingAddress ? JSON.parse(localStorageShippingAddress) : {}

const initialState = { 
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage 
  },
  userSignin: { userInfo: userInfoFromStorage }
}
const store = configureStore(initialState)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
