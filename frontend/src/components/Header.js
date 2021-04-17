import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'

import { signout } from "../redux/actions/userActions"
import SearchBox from './SearchBox'

const Header = () => {
  const dispatch = useDispatch()
  const userSignin = useSelector(state => state.userSignin)
  const { userInfo } = userSignin

  const signoutHandler = () => {
    dispatch(signout())
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({history}) => <SearchBox history={history} />} />
            <Nav className="ml-auto">
              <LinkContainer to='/cart'>
                <Nav.Link><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
              </LinkContainer>
              { userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={signoutHandler}>Sign out</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/signin'>
                  <Nav.Link><i className="fas fa-user"></i> Sign in</Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='admin' id='admin-menu'>
                  <LinkContainer to='/admin/users'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/products'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orders'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
