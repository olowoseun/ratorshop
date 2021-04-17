import * as types from '../constants/productTypes'
import axios from 'axios'

export const loadProducts = (keyword = '', pageNumber = '') => async(dispatch) => {
   try {
     dispatch({ type: types.PRODUCT_LIST_REQUEST })
     const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
     dispatch({ type: types.PRODUCT_LIST_SUCCESS, payload: data })
   } catch (err) {
     dispatch({ type: types.PRODUCT_LIST_FAIL, 
      payload: err.response && err.response.data.message ? err.response.data.message : err.message })
   }
}

export const loadTopRatedProducts = () => async(dispatch) => {
   try {
     dispatch({ type: types.PRODUCT_TOP_RATED_REQUEST })
     const { data } = await axios.get(`/api/products/top`)
     dispatch({ type: types.PRODUCT_TOP_RATED_SUCCESS, payload: data })
   } catch (err) {
     dispatch({ type: types.PRODUCT_TOP_RATED_FAIL, 
      payload: err.response && err.response.data.message ? err.response.data.message : err.message })
   }
}

export const getProductDetails = (id) => async(dispatch) => {
   try {
     dispatch({ type: types.PRODUCT_DETAILS_REQUEST })
     const { data } = await axios.get(`/api/products/${id}`)
     dispatch({ type: types.PRODUCT_DETAILS_SUCCESS, payload: data })
   } catch (err) {
     dispatch({ type: types.PRODUCT_DETAILS_FAIL, 
      payload: err.response && err.response.data.message ? err.response.data.message : err.message })
   }
}

export const deleteProduct = id => async (dispatch, getState) => {
  try {
    dispatch({ type: types.PRODUCT_DELETE_REQUEST  })

    const { userSignin: { userInfo } } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    await axios.delete(`/api/products/${id}`, config)
    dispatch({ type: types.PRODUCT_DELETE_SUCCESS })

  } catch (err) {
    dispatch({ 
      type: types.PRODUCT_DELETE_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message 
    })
  }
}

export const createProduct = _ => async (dispatch, getState) => {
  try {
    dispatch({ type: types.PRODUCT_CREATE_REQUEST })

    const { userSignin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.post(`/api/products`, {}, config)
    dispatch({ type: types.PRODUCT_CREATE_SUCCESS, payload: data })

  } catch (err) {
    dispatch({ 
      type: types.PRODUCT_CREATE_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message 
    })
  }
}

export const updateProduct = product => async (dispatch, getState) => {
  try {
    dispatch({ type: types.PRODUCT_UPDATE_REQUEST })

    const { userSignin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(`/api/products/${product._id}`, product, config)
    dispatch({ type: types.PRODUCT_UPDATE_SUCCESS, payload: data })

  } catch (err) {
    dispatch({ 
      type: types.PRODUCT_UPDATE_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message 
    })
  }
}

export const createProductReview = (productId, review) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.PRODUCT_CREATE_REVIEW_REQUEST })

    const { userSignin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    await axios.post(`/api/products/${productId}/reviews`, review, config)
    dispatch({ type: types.PRODUCT_CREATE_REVIEW_SUCCESS })

  } catch (err) {
    dispatch({ 
      type: types.PRODUCT_CREATE_REVIEW_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message 
    })
  }
}

