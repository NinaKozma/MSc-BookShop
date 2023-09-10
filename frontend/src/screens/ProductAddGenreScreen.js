import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listGenres, createGenre } from '../actions/genreActions';
import Meta from '../components/Meta';

const ProductAddGenreScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState('');

  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const genreCreate = useSelector((state) => state.genreCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = genreCreate;

  useEffect(() => {
    if (successCreate) {
      dispatch(listGenres());
      history.push(`/admin/product/${productId}/edit`);
    }
  }, [successCreate, dispatch, history, productId]);

  const createGenreHandler = (event) => {
    event.preventDefault();

    if (name === '') {
      setMessage('Genre must have a name!');
    } else if (!/^[a-zA-Z]+$/.test(name)) {
      setMessage('Genre name can only contain letters!');
    } else {
      dispatch(
        createGenre(productId, {
          name,
        })
      );
    }
  };

  return (
    <>
      <Meta title='Add a genre' />
      <Link
        className='btn btn-light my-3'
        to={`/admin/product/${productId}/edit`}
      >
        Go Back
      </Link>
      <FormContainer>
        <h1>Add a new genre</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loadingCreate && <Loader />}
        <Form onSubmit={createGenreHandler}>
          <FormGroup controlId='name'>
            <Form.Label>Name</Form.Label>
            <span className='required'> *</span>
            <Form.Control
              type='name'
              placeholder='Enter genre name'
              value={name}
              onChange={(event) => setName(event.target.value)}
            ></Form.Control>
          </FormGroup>
          <Form.Label>
            <span className='required'> * </span>Required fields
          </Form.Label>
          <br></br>
          <Button type='submit' variant='primary'>
            Create genre
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductAddGenreScreen;
