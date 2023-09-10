import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listWriters, createWriter } from '../actions/writerActions';
import DatePicker from 'react-date-picker';
import Meta from '../components/Meta';

const ProductAddWriterScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [nationality, setNationality] = useState('');

  const [message, setMessage] = useState();

  const dispatch = useDispatch();

  const writerCreate = useSelector((state) => state.writerCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = writerCreate;

  useEffect(() => {
    if (successCreate) {
      dispatch(listWriters());
      history.push(`/admin/product/${productId}/edit`);
    }
  }, [successCreate, dispatch, history, productId]);

  const createWriterHandler = (event) => {
    event.preventDefault();

    if (firstName === '') {
      setMessage('First name is required!');
    } else if (lastName === '') {
      setMessage('Last name is required!');
    } else if (!/^[a-zA-Z]+$/.test(firstName)) {
      setMessage('First name can contain only letters!');
    } else if (!/^[a-zA-Z]+$/.test(lastName)) {
      setMessage('Last name can contain only letters!');
    } else if (dateOfBirth === '') {
      setMessage('Date of birth is required!');
    } else if (2021 - dateOfBirth.getFullYear() <= 16) {
      setMessage('Writer must have at least 16 years!');
    } else {
      dispatch(
        createWriter(productId, {
          firstName,
          lastName,
          dateOfBirth,
          nationality,
        })
      );
    }
  };

  return (
    <>
      <Meta title='Add a writer' />
      <Link
        className='btn btn-light my-3'
        to={`/admin/product/${productId}/edit`}
      >
        Go Back
      </Link>
      <FormContainer>
        <h1>Add a new writer</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loadingCreate && <Loader />}
        <Form onSubmit={createWriterHandler}>
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
          <FormGroup controlId='nationality'>
            <Form.Label>Nationality</Form.Label>
            <span className='required'> *</span>
            <Form.Control
              type='nationality'
              placeholder='Enter nationality'
              value={nationality}
              onChange={(event) => setNationality(event.target.value)}
            ></Form.Control>
          </FormGroup>

          <Form.Label>
            <span className='required'> * </span>Required fields
          </Form.Label>
          <br></br>
          <Button type='submit' variant='primary'>
            Create writer
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductAddWriterScreen;
