import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'

import { 
  createProduct,
  deleteProduct, 
  loadProducts 
} from '../redux/actions/productActions'
import { PRODUCT_CREATE_RESET } from '../redux/constants/productTypes'
import Paginate from '../components/Paginate'

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { loading, error, products, pages, page } = productList
  
  const productDelete = useSelector(state => state.productDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete
  
  const productCreate = useSelector(state => state.productCreate)
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate
  
  const userSignin = useSelector(state => state.userSignin)
  const { userInfo } = userSignin
  
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })
    if(!userInfo.isAdmin) {
      history.push('/signin')
    }
    if(successCreate) {
      history.push(`/admin/products/${createdProduct._id}/edit`)
    } else {
      dispatch(loadProducts('', pageNumber))
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, pageNumber])

  const createProductHandler = _ => {
    dispatch(createProduct())
  }

  const deleteHandler = id => {
    if(window.confirm('Are you sure?'))
      dispatch(deleteProduct(id))  
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1> 
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
     {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> 
     : (
       <>
       <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <LinkContainer to={`/admin/products/${product._id}/edit`}>
                  <Button variant='dark' className='btn-sm'>
                    <i className='fas fa-edit'></i>
                  </Button>
                </LinkContainer>
                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                  <i className='fas fa-trash'></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
       </Table>
       <Paginate pages={pages} page={page} isAdmin={true} />
       </>
     )}
    </>
  )
}

export default ProductListScreen
