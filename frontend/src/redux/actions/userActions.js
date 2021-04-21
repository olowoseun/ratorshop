import * as types from '../constants/userTypes'
import * as orderTypes from '../constants/orderTypes'
import * as cartTypes from '../constants/cartTypes'
import axios from 'axios'

export const signin = (email, password) => async(dispatch) => {
  try {
    dispatch({ type: types.USER_SIGNIN_REQUEST  })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.post('/api/users/signin', { email, password }, config)
    dispatch({ type: types.USER_SIGNIN_SUCCESS, payload: data })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (err) {
    dispatch({ 
      type: types.USER_SIGNIN_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message 
    })
  }
}

export const signout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: types.USER_SIGNOUT})
  dispatch({ type: types.USER_DETAILS_RESET})
  dispatch({ type: orderTypes.MY_ORDER_LIST_RESET})
  dispatch({ type: types.USER_LIST_RESET })
  dispatch({ type: cartTypes.CART_RESET})
} 

export const signup = (name, email, password) => async(dispatch) => {
  try {
    dispatch({ type: types.USER_SIGNUP_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.post('/api/users/', { name, email, password }, config)
    dispatch({ type: types.USER_SIGNUP_SUCCESS, payload: data })
    dispatch({ type: types.USER_SIGNIN_SUCCESS, payload: data })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (err) {
    dispatch({ 
      type: types.USER_SIGNUP_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message 
    })
  }
}

export const getUserDetails = (id) => async(dispatch, getState) => {
  try {
    dispatch({ type: types.USER_DETAILS_REQUEST })
    const { userSignin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(`/api/users/${id}`, config)
    dispatch({ type: types.USER_DETAILS_SUCCESS, payload: data })
  } catch (err) {
    dispatch({ 
      type: types.USER_DETAILS_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message 
    })
  }
}

export const userUpdateProfile = (user) => async(dispatch, getState) => {
  try {
    dispatch({ type: types.USER_UPDATE_PROFILE_REQUEST })
    const { userSignin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(`/api/users/profile`, user, config)
    dispatch({ type: types.USER_UPDATE_PROFILE_SUCCESS, payload: data })
    dispatch({ type: types.USER_SIGNIN_SUCCESS, payload: data })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (err) {
    dispatch({ 
      type: types.USER_UPDATE_PROFILE_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message 
    })
  }
}

export const listUsers = () => async(dispatch, getState) => {
  try {
    dispatch({ type: types.USER_LIST_REQUEST })
    const { userSignin: { userInfo } } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(`/api/users`, config)
    dispatch({ type: types.USER_LIST_SUCCESS, payload: data })
  } catch (err) {
    dispatch({ 
      type: types.USER_LIST_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message 
    })
  }
}

export const deleteUser = id => async(dispatch, getState) => {
  try {
    dispatch({ type: types.USER_DELETE_REQUEST })
    const { userSignin: { userInfo } } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    await axios.delete(`/api/users/${id}`, config)
    dispatch({ type: types.USER_DELETE_SUCCESS })
  } catch (err) {
    dispatch({ 
      type: types.USER_DELETE_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message 
    })
  }
}

export const updateUser = user => async(dispatch, getState) => {
  try {
    dispatch({ type: types.USER_UPDATE_REQUEST })
    const { userSignin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(`/api/users/${user._id}`, user, config)
    dispatch({ type: types.USER_UPDATE_SUCCESS })
    dispatch({ type: types.USER_DETAILS_SUCCESS, payload: data })
  } catch (err) {
    dispatch({ 
      type: types.USER_UPDATE_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message 
    })
  }
}
