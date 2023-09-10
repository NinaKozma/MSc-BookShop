import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';
import Meta from '../components/Meta';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    //Ukoliko je korisnik ulogovan, ne zelim da se opet loguje - userInfo onda nece biti null!
    //Tada radim redirekciju na shipping!
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (event) => {
    event.preventDefault(); //kako se stranica ne bi refreshovala
    dispatch(login(email, password));
  };

  return (
    <>
      <Meta title='Login' />
      <FormContainer>
        <h1>Sign in </h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
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
          <Button type='submit' variant='primary'>
            Sign In
          </Button>
        </Form>
        <Row className='py-3'>
          <Col>
            {' '}
            New customer?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              Register Now!
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
