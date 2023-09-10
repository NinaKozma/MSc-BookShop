import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, FormGroup, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import DatePicker from 'react-date-picker';
import { listMyOrders } from '../actions/orderActions';
import Meta from '../components/Meta';

const ProfileScreen = ({ location, history }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [JMBG, setJMBG] = useState(null);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderMyList = useSelector((state) => state.orderMyList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderMyList;

  useEffect(() => {
    //Ukoliko korisnik nije ulogovan, tada radim redirekciju!
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.firstName) {
        dispatch(getUserDetails('profile')); //Profile kao ID!!!
        dispatch(listMyOrders());
      } else {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setJMBG(user.JMBG);
        setDateOfBirth(user.dateOfBirth);
        setAddress(user.address);
        setCity(user.city);
        setCountry(user.country);
        setPhoneNumber(user.phoneNumber);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (event) => {
    event.preventDefault(); //kako se stranica ne bi refreshovala

    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
    } else if (firstName === '') {
      setMessage('First name is required!');
    } else if (lastName === '') {
      setMessage('Last name is required!');
    } else if (!/^[a-zA-Z]+$/.test(firstName)) {
      setMessage('First name can contain only letters!');
    } else if (!/^[a-zA-Z]+$/.test(lastName)) {
      setMessage('Last name can contain only letters!');
    } else if (dateOfBirth === null) {
      setMessage('Date of birth is required!');
    } else if (2021 - dateOfBirth.toString().substring(11, 15) <= 16) {
      setMessage(
        'You must have at least 16 years in order to make your account!'
      );
    } else if (address === '') {
      setMessage('Address is required!');
    } else if (city === '') {
      setMessage('City is required!');
    } else if (country === '') {
      setMessage('Country is required!');
    } else if (phoneNumber === '') {
      setMessage('Phone number is required!');
    } else if (!/^\d+$/.test(phoneNumber)) {
      setMessage('Phone number can only contain digits!');
    } else if (email === '') {
      setMessage('Email is required!');
    } else if (password === '') {
      setMessage('Password is required!');
    } else if (password.length < 6) {
      setMessage('Password must have at least 6 characters!');
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          firstName,
          lastName,
          dateOfBirth,
          address,
          city,
          country,
          phoneNumber,
          email,
          password,
        })
      );
    }
  };

  return (
    <>
      <Meta title='Profile' />
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>
          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {success && <Message variant='success'>Profile Updated!</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <FormGroup controlId='firstName'>
              <Form.Label>First name</Form.Label>
              <Form.Control
                type='firstName'
                placeholder='Enter first name'
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              ></Form.Control>
            </FormGroup>

            <FormGroup controlId='lastName'>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type='lastName'
                placeholder='Enter last name'
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              ></Form.Control>
            </FormGroup>

            {JMBG !== null && JMBG !== undefined && JMBG.length === 13 && (
              <FormGroup controlId='JMBG'>
                <Form.Label>JMBG</Form.Label>
                <Form.Control
                  type='JMBG'
                  value={JMBG}
                  disabled='disabled'
                ></Form.Control>
              </FormGroup>
            )}

            <FormGroup controlId='dateOfBirth'>
              <Form.Label>Date of Birth</Form.Label>
              <br></br>
              <DatePicker
                type='dateOfBirth'
                value={dateOfBirth}
                selected={dateOfBirth}
                onChange={(date) => setDateOfBirth(date)}
              />
            </FormGroup>

            {/* <FormGroup controlId='dateOfBirth'>
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type='dateOfBirth'
              placeholder='Enter date of birth'
              value={new Date(dateOfBirth).toLocaleDateString('en-US')}
              onChange={(event) => setDateOfBirth(event.target.value)}
            ></Form.Control>
          </FormGroup> */}

            <FormGroup controlId='address'>
              <Form.Label>Adress</Form.Label>
              <Form.Control
                type='address'
                placeholder='Enter adress'
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              ></Form.Control>
            </FormGroup>

            <FormGroup controlId='city'>
              <Form.Label>City</Form.Label>
              <Form.Control
                type='city'
                placeholder='Enter city'
                value={city}
                onChange={(event) => setCity(event.target.value)}
              ></Form.Control>
            </FormGroup>

            <FormGroup controlId='country'>
              <Form.Label>Country</Form.Label>
              <Form.Control
                type='country'
                placeholder='Enter country'
                value={country}
                onChange={(event) => setCountry(event.target.value)}
              ></Form.Control>
            </FormGroup>

            <FormGroup controlId='phoneNumber'>
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type='phoneNumber'
                placeholder='Enter phone number'
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              ></Form.Control>
            </FormGroup>

            <FormGroup controlId='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              ></Form.Control>
            </FormGroup>

            <FormGroup controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              ></Form.Control>
            </FormGroup>

            <FormGroup controlId='cofirmPassword'>
              <Form.Label>Cofirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              ></Form.Control>
            </FormGroup>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        </Col>
        <div class='vl'></div>
        <Col md={8}>
          <h2>My Orders</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant='danger'>{errorOrders}</Message>
          ) : orders.length === 0 ? (
            <>
              <Message variant='info'>You haven't made any orders yet!</Message>
              <img src='/images/emptyCart.png' alt='emptyCart' />
            </>
          ) : (
            <>
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr
                    style={{
                      background: 'rgba(255, 245, 168, 1)',
                    }}
                  >
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th style={{ textAlign: 'center' }}>PAID</th>
                    <th style={{ textAlign: 'center' }}>DELIVERED</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{Number(order.totalPrice).toFixed(2)} RSD</td>
                      <td style={{ textAlign: 'center' }}>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button className='btn-sm' variant='light'>
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <img
                src='/images/thanks.jpg'
                alt='thanks'
                style={{ marginLeft: '5rem' }}
              ></img>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
