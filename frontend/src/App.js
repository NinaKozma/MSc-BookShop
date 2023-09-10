import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import ProductAddWriterScreen from './screens/ProductAddWriterScreen';
import ProductAddGenreScreen from './screens/ProductAddGenreScreen';
import ProductAddPublisherScreen from './screens/ProductAddPublisherScreen';
import ProductAddSupplierScreen from './screens/ProductAddSupplierScreen';
import ReportListScreen from './screens/ReportListScreen';

//Functional component - vraca ceo output; JSX
/*Return obavezno vraca samo jedan element i to moze
biti bilo koji element*/
const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Switch>
            <Route path='/order/:id' component={OrderScreen} exact />
            <Route path='/shipping' component={ShippingScreen} exact />
            <Route path='/payment' component={PaymentScreen} exact />
            <Route path='/placeorder' component={PlaceOrderScreen} exact />
            <Route path='/login' component={LoginScreen} exact />
            <Route path='/register' component={RegisterScreen} exact />
            <Route path='/profile' component={ProfileScreen} exact />
            <Route path='/product/:id' component={ProductScreen} exact />
            <Route path='/cart/:id?' component={CartScreen} exact />
            <Route
              path='/admin/reportlist'
              component={ReportListScreen}
              exact
            />
            <Route path='/admin/userlist' component={UserListScreen} exact />
            <Route
              path='/admin/writerlist'
              component={ProductEditScreen}
              exact
            />
            <Route
              path='/admin/genrelist'
              component={ProductEditScreen}
              exact
            />
            <Route
              path='/admin/publisherlist'
              component={ProductEditScreen}
              exact
            />
            <Route
              path='/admin/supplierlist'
              component={ProductEditScreen}
              exact
            />
            <Route
              path='/admin/user/:id/edit'
              component={UserEditScreen}
              exact
            />
            <Route
              path='/admin/productlist'
              component={ProductListScreen}
              exact
            />
            <Route
              path='/admin/productlist/:pageNumber'
              component={ProductListScreen}
              exact
            />
            <Route
              path='/admin/product/:id/edit'
              component={ProductEditScreen}
              exact
            />
            <Route
              path='/admin/product/:id/writers'
              component={ProductAddWriterScreen}
              exact
            />
            <Route
              path='/admin/product/:id/genres'
              component={ProductAddGenreScreen}
              exact
            />
            <Route
              path='/admin/product/:id/publishers'
              component={ProductAddPublisherScreen}
              exact
            />
            <Route
              path='/admin/product/:id/suppliers'
              component={ProductAddSupplierScreen}
              exact
            />
            <Route path='/admin/orderlist' component={OrderListScreen} exact />
            <Route path='/search/:keyword' component={HomeScreen} exact />
            <Route path='/page/:pageNumber' component={HomeScreen} exact />
            {/* kada imam veliki broj rezultata pretrage, a i dalje zelim da mi se prikaze paginacija */}
            <Route
              path='/search/:keyword/page/:pageNumber'
              component={HomeScreen}
              exact
            />
            <Route path='/' component={HomeScreen} exact />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
