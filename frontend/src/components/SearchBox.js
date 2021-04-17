import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = e => {
    e.preventDefault()

    if(keyword.trim()) return history.push(`/search/${keyword}`)
    history.push('/')
  }
  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        value={keyword}
        placeholder='Search products...'
        onChange={e => setKeyword(e.target.value)}
        className='mr-sm-2 ml-sm-5'/>
      <Button
        type='submit'
        variant='outline-success'
        className='p-2'>Search</Button>
    </Form>
  )
}

export default SearchBox
