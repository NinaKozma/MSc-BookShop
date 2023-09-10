import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';
import DatePicker from 'react-date-picker';
import Meta from '../components/Meta';

const RegisterScreen = ({ location, history }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    //Ukoliko je korisnik ulogovan, ne zelim da se opet loguje - userInfo onda nece biti null!
    //Tada radim redirekciju!
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (event) => {
    event.preventDefault(); //kako se stranica ne bi refreshovala

    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
    } else if (firstName === ' ') {
      setMessage('First name is required!');
    } else if (lastName === '') {
      setMessage('Last name is required!');
    } else if (!/^[a-zA-Z]+$/.test(firstName)) {
      setMessage('First name can contain only letters!');
    } else if (!/^[a-zA-Z]+$/.test(lastName)) {
      setMessage('Last name can contain only letters!');
    } else if (dateOfBirth === null) {
      setMessage('Date of birth is required!');
    } else if (2021 - dateOfBirth.getFullYear() <= 16) {
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
        register(
          firstName,
          lastName,
          dateOfBirth,
          address,
          city,
          country,
          phoneNumber,
          email,
          password
        )
      );
    }
  };

  return (
    <>
      <Meta title='Register Now' />
      <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <FormGroup controlId='firstName'>
            <Form.Label>First name</Form.Label>
            <span className='required'> *</span>
            <Form.Control
              type='firstName'
              placeholder='Enter first name'
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId='lastName'>
            <Form.Label>Last name</Form.Label>
            <span className='required'> *</span>
            <Form.Control
              type='lastName'
              placeholder='Enter last name'
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId='dateOfBirth'>
            <Form.Label>Date of Birth</Form.Label>
            <span className='required'> *</span>
            <br></br>
            <DatePicker
              type='dateOfBirth'
              selected={dateOfBirth}
              value={dateOfBirth}
              onChange={(date) => setDateOfBirth(date)}
            />
          </FormGroup>
          {/* <FormGroup controlId='dateOfBirth'>
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type='dateOfBirth'
            placeholder='Enter date of birth'
            value={dateOfBirth}
            onChange={(event) => setDateOfBirth(event.target.value)}
          ></Form.Control>
        </FormGroup> */}
          <FormGroup controlId='address'>
            <Form.Label>Address</Form.Label>
            <span className='required'> *</span>
            <Form.Control
              type='address'
              placeholder='Enter address'
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId='city'>
            <Form.Label>City</Form.Label>
            <span className='required'> *</span>
            <Form.Control
              type='city'
              placeholder='Enter city'
              value={city}
              onChange={(event) => setCity(event.target.value)}
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId='country'>
            <Form.Label>Country</Form.Label>
            <span className='required'> *</span>
            <Form.Control
              type='country'
              placeholder='Enter country'
              value={country}
              onChange={(event) => setCountry(event.target.value)}
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId='phoneNumber'>
            <Form.Label>Phone number</Form.Label>
            <span className='required'> *</span>
            <Form.Control
              type='phoneNumber'
              placeholder='Enter phone number'
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId='email'>
            <Form.Label>Email address</Form.Label>
            <span className='required'> *</span>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId='password'>
            <Form.Label>Password</Form.Label>
            <span className='required'> *</span>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId='cofirmPassword'>
            <Form.Label>Cofirm Password</Form.Label>
            <span className='required'> *</span>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            ></Form.Control>
          </FormGroup>
          <Form.Label>
            <span className='required'> * </span>Required fields
          </Form.Label>
          <br></br>
          <Button variant='primary' type='submit'>
            Register
          </Button>
        </Form>
        <Row className='py-3'>
          <Col>
            {' '}
            Already have an account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Login Now!
            </Link>
          </Col>
        </Row>
      </FormContainer>
      ;
    </>
  );
};

export default RegisterScreen;
