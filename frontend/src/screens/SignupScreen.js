import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { signup } from '../redux/actions/userActions'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'

const SignupScreen = ({ history, location }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const userSignup = useSelector(state => state.userSignup)
  const { loading, error, userInfo } = userSignup

  const redirect = location.search ? location.search.split('=')[1] :  '/'

  useEffect(() => {
    if(userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = e => {
    e.preventDefault()
    if(password !== confirmPassword) return setMessage('Password do not match')
    dispatch(signup(name, email, password))
  }

  return (
    <FormContainer>
      <h1>Sign up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
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
            Sign up
          </Button>
      </Form>    
      <Row className='py-3'>
        <Col>
          Have an account? <Link to={ redirect ? `/signin?redirect=${redirect}` : '/signin'}>Sign in</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default SignupScreen
