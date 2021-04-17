import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { getUserDetails, updateUser } from '../redux/actions/userActions'
import { USER_UPDATE_RESET } from '../redux/constants/userTypes'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'

const UserEditScreen = ({ history, match }) => {
  const userId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()
  
  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails
  
  const userUpdate = useSelector(state => state.userUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate


  useEffect(() => {
    if(successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/users')
    } else {
      if(!user.name || user._id !== userId) {
      dispatch(getUserDetails(userId))
      }
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }

  }, [dispatch, history, successUpdate, user, userId])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name, email, isAdmin }))
  }

  return (
    <>
      <Link to='/admin/users' className='btn btn-dark my-3'>Go back</Link>
      <FormContainer>
        <h1>Edit user</h1>
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
            <Form.Group controlId='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type='email' 
                placeholder='Enter email'
                value={email}
                onChange={e => setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='isAdmin'>
              <Form.Check 
                type='checkbox' 
                label='Is Admin'
                checked={isAdmin}
                onChange={e => setIsAdmin(e.target.checked)}></Form.Check>
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

export default UserEditScreen
