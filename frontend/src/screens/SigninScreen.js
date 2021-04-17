import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { signin } from '../redux/actions/userActions'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'

const SigninScreen = ({ history, location }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const userSignin = useSelector(state => state.userSignin)
  const { loading, error, userInfo } = userSignin

  const redirect = location.search ? location.search.split('=')[1] :  '/'

  useEffect(() => {
    if(userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(signin(email, password))
  }

  return (
    <FormContainer>
      <h1>Sign in</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
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
        <Button
          type='submit'
          variant='primary'>
            Sign in
          </Button>
      </Form>    
      <Row className='py-3'>
        <Col>
          New customer? <Link to={ redirect ? `/signup?redirect=${redirect}` : '/register'}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default SigninScreen
