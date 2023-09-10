import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listPublishers, createPublisher } from '../actions/publisherActions';
import Meta from '../components/Meta';

const ProductAddPublisherScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [taxID, setTaxID] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const publisherCreate = useSelector((state) => state.publisherCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = publisherCreate;

  useEffect(() => {
    if (successCreate) {
      dispatch(listPublishers());
      history.push(`/admin/product/${productId}/edit`);
    }
  }, [successCreate, dispatch, history, productId]);

  const createPublisherHandler = (event) => {
    event.preventDefault();

    if (name === '') {
      setMessage('Publisher must have a name!');
    } else if (taxID === '') {
      setMessage('Publisher must have a taxID!');
    } else if (!/^\d+$/.test(taxID)) {
      setMessage('TaxID can only contain digits!');
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
    } else {
      dispatch(
        createPublisher(productId, {
          name,
          taxID,
          address,
          city,
          country,
          phoneNumber,
          email,
        })
      );
    }
  };

  return (
    <>
      <Meta title='Add a publisher' />
      <Link
        className='btn btn-light my-3'
        to={`/admin/product/${productId}/edit`}
      >
        Go Back
      </Link>
      <FormContainer>
        <h1>Add a new publisher</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loadingCreate && <Loader />}
        <Form onSubmit={createPublisherHandler}>
          <FormGroup controlId='name'>
            <Form.Label>Name</Form.Label>
            <span className='required'> *</span>
            <Form.Control
              type='name'
              placeholder='Enter publisher name'
              value={name}
              onChange={(event) => setName(event.target.value)}
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId='taxID'>
            <Form.Label>Tax ID</Form.Label>
            <span className='required'> *</span>
            <Form.Control
              type='taxID'
              placeholder='Enter tax ID'
              value={taxID}
              onChange={(event) => setTaxID(event.target.value)}
            ></Form.Control>
          </FormGroup>
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
            <Form.Label>Email</Form.Label>
            <span className='required'> *</span>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            ></Form.Control>
          </FormGroup>

          <Form.Label>
            <span className='required'> * </span>Required fields
          </Form.Label>
          <br></br>
          <Button type='submit' variant='primary'>
            Create publisher
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductAddPublisherScreen;
