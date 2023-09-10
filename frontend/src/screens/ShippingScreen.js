import React, { useState } from 'react';
import { Form, Button, FormGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartActions';
import Meta from '../components/Meta';
import Message from '../components/Message';

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const [message, setMessage] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();

    if (address === '') {
      setMessage('Address is required!');
    } else if (city === '') {
      setMessage('City is required!');
    } else if (country === '') {
      setMessage('Country is required!');
    } else if (postalCode === '') {
      setMessage('Postal code is required!');
    } else if (!/^\d+$/.test(postalCode)) {
      setMessage('Postal code can only contain digits!');
    } else {
      dispatch(saveShippingAddress({ address, city, postalCode, country }));
      history.push('/payment'); //nakon toga sledi redirekcija na ovu stranicu
    }
  };

  return (
    <>
      <Meta title='Shipping Your Order' />
      <FormContainer>
        {/* prosledjujem trenutni korak i svaki prethodni korak */}
        <CheckoutSteps step1 step2></CheckoutSteps>
        <h1>Shipping</h1>
        {message && <Message variant='danger'>{message}</Message>}
        <Form onSubmit={submitHandler}>
          <FormGroup controlId='address'>
            <Form.Label>Address</Form.Label>
            <span className='required'> *</span>
            <Form.Control
              type='text'
              placeholder='Enter address'
              value={address}
              require
              onChange={(event) => setAddress(event.target.value)}
            ></Form.Control>
          </FormGroup>

          <FormGroup controlId='city'>
            <Form.Label>City</Form.Label>
            <span className='required'> *</span>
            <Form.Control
              type='text'
              placeholder='Enter city'
              value={city}
              require
              onChange={(event) => setCity(event.target.value)}
            ></Form.Control>
          </FormGroup>

          <FormGroup controlId='postalCode'>
            <Form.Label>Postal Code</Form.Label>
            <span className='required'> *</span>
            <Form.Control
              type='text'
              placeholder='Enter postal code'
              value={postalCode}
              require
              onChange={(event) => setPostalCode(event.target.value)}
            ></Form.Control>
          </FormGroup>

          <FormGroup controlId='country'>
            <Form.Label>Country</Form.Label>
            <span className='required'> *</span>
            <Form.Control
              type='text'
              placeholder='Enter country'
              value={country}
              require
              onChange={(event) => setCountry(event.target.value)}
            ></Form.Control>
          </FormGroup>

          <Form.Label>
            <span className='required'> * </span>Required fields
          </Form.Label>
          <br></br>
          <Button type='submit' variant='primary'>
            Contine
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ShippingScreen;
