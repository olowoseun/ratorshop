import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { getProductDetails, updateProduct } from '../redux/actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../redux/constants/productTypes'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProductEditScreen = ({ history, match }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()
  
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails
  
  const productUpdate = useSelector(state => state.productUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

  useEffect(() => {
    if(successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/products')
    } else {
      if(!product.name || product._id !== productId) {
        dispatch(getProductDetails(productId))
      }
  
      setName(product.name)
      setPrice(product.price)
      setImage(product.image)
      setBrand(product.brand)
      setCategory(product.category)
      setDescription(product.description)
      setCountInStock(product.countInStock)
    }

  }, [dispatch, history, product, productId, successUpdate])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(updateProduct({
      _id: productId,
      name,
      price, 
      image,
      brand,
      category,
      description,
      countInStock
    }))
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      const { data } = await axios.post('/api/uploads', formData, config)
      setImage(data)
      setUploading(false)
    } catch (err) {
      console.error(err)
      setUploading(false)
    }
  }

  return (
    <>
      <Link to='/admin/products' className='btn btn-dark my-3'>Go back</Link>
      <FormContainer>
        <h1>Edit product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type='text' 
                placeholder='Enter name'
                value={name}
                onChange={e => setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control 
                type='number' 
                placeholder='Enter price'
                value={price}
                onChange={e => setPrice(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='image'>
              <Form.Label>Price</Form.Label>
              <Form.Control 
                type='text' 
                placeholder='Enter image url'
                value={image}
                onChange={e => setImage(e.target.value)}></Form.Control>
                <Form.File 
                  id='image-file' 
                  label='Choose file'
                  custom
                  onChange={uploadFileHandler}></Form.File>
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control 
                type='text' 
                placeholder='Enter brand'
                value={brand}
                onChange={e => setBrand(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='countInStock'>
              <Form.Label>Count in stock</Form.Label>
              <Form.Control 
                type='number' 
                placeholder='Enter count in stock'
                value={countInStock}
                onChange={e => setCountInStock(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control 
                type='text' 
                placeholder='Enter category'
                value={category}
                onChange={e => setCategory(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Desciption</Form.Label>
              <Form.Control 
                type='text' 
                placeholder='Enter description'
                value={description}
                onChange={e => setDescription(e.target.value)}></Form.Control>
            </Form.Group>

            <Button
              type='submit'
              variant='primary'>
                Update
              </Button>
          </Form>
        )}
      </FormContainer>
    </>
    
  )
}

export default ProductEditScreen
