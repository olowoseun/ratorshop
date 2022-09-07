import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const current_year = new Date().getFullYear()

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            Copyright &copy; { current_year } Rator Shop
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
