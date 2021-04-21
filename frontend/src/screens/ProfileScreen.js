import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { getUserDetails, userUpdateProfile } from '../redux/actions/userActions'
import { listMyOrders } from '../redux/actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../redux/constants/userTypes'
import Message from '../components/Message'
import Loader from '../components/Loader'


const ProfileScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails
  
  const userSignin = useSelector(state => state.userSignin)
  const { userInfo } = userSignin
  
  const updateUserProfile = useSelector(state => state.userUpdateProfile)
  const { success } = updateUserProfile
  
  const myOrderList = useSelector(state => state.myOrderList)
  const { loading: loadingOrders, error: errorOrders, orders } = myOrderList

  useEffect(() => {
    if(!userInfo) return history.push('/signin')

    if(!user || !user.name || success) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET })
      dispatch(getUserDetails('profile'))
      dispatch(listMyOrders())
    } 
    setName(user.name)
    setEmail(user.email)
  }, [dispatch, history, userInfo, user, success])

  const submitHandler = e => {
    e.preventDefault()
    if(password !== confirmPassword) return setMessage('Password do not match')
    dispatch(userUpdateProfile({ id: user._id, name, email, password }))
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Profile updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type='text' 
              placeholder='Enter name'
              value={name}
              onChange={e => setName(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type='email' 
              placeholder='Enter email'
              value={email}
              onChange={e => setEmail(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type='password' 
              placeholder='Enter password'
              value={password}
              onChange={e => setPassword(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control 
              type='password' 
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}></Form.Control>
          </Form.Group>
          <Button
            type='submit'
            variant='primary'>
              Update
            </Button>
        </Form>   
      </Col>
      <Col md={9}>
        <h2>My orders</h2>
        {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> 
        : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.isPaid ? (order.paidAt && order.paidAt.substring(0, 10)) 
                    : (<i className='fas fa-times' style={{ color: 'red' }}></i>)}
                  </td>
                  <td>{order.isDelivered ? (order.deliveredAt.substring(0, 10))
                    : (<i className='fas fa-times' st yle={{ color: 'red' }}></i>)}
                  </td>
                  <td>
                    <LinkContainer to={`/orders/${order._id}`}>
                      <Button variant='dark' className='btn-sm'>Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
