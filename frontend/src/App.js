import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import SigninScreen from './screens/SigninScreen'
import SignupScreen from './screens/SignupScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container className="py-3">
          <Switch>
            <Route path='/orders/:id' component={OrderScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/signin' component={SigninScreen} />
            <Route path='/signup' component={SignupScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/products/:id' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route path='/admin/users/:id/edit' component={UserEditScreen} />
            <Route path='/admin/users' component={UserListScreen} />
            <Route path='/admin/products/:id/edit' component={ProductEditScreen} />
            <Route exact path='/admin/products' component={ProductListScreen} />
            <Route exact path='/admin/products/:pageNumber' component={ProductListScreen} />
            <Route path='/admin/orders' component={OrderListScreen} />
            <Route exact path='/search/:keyword' component={HomeScreen} />
            <Route exact path='/page/:pageNumber' component={HomeScreen} />
            <Route exact path='/search/:keyword/page/:pageNumber' component={HomeScreen} />
            <Route exact path='/' component={HomeScreen} />
          </Switch>
        </Container>
      </main>
     <Footer />
    </Router>
  );
}

export default App;
