import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, FormGroup, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUser } from '../actions/userActions';
import DatePicker from 'react-date-picker';
import Meta from '../components/Meta';

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [JMBG, setJMBG] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [phoneNumber, setPhoneNumber] = useState('');

  const [message, setMessage] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      //uspesan update
      dispatch({ type: 'USER_UPDATE_RESET' });
      history.push('/admin/userlist');
    } else {
      //neuspesan update
      if (!user.firstName || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setJMBG(user.JMBG);
        setAddress(user.address);
        setCity(user.city);
        setCountry(user.country);
        setDateOfBirth(user.dateOfBirth);
        setPhoneNumber(user.phoneNumber);
      }
    }
  }, [dispatch, history, userId, user, successUpdate]);

  const submitHandler = (event) => {
    event.preventDefault(); //kako se stranica ne bi refreshovala

    if (firstName === '') {
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
      setMessage('User must have at least 16 years in order to have account!');
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
    } else {
      dispatch(
        updateUser({
          _id: userId,
          firstName,
          lastName,
          JMBG,
          address,
          city,
          country,
          dateOfBirth,
          phoneNumber,
        })
      );
    }
  };

  return (
    <>
      <Meta title='Edit User' />
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit User</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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

            {user.JMBG !== null &&
              user.JMBG !== undefined &&
              user.JMBG.length === 13 && (
                <FormGroup controlId='JMBG'>
                  <Form.Label>JMBG</Form.Label>
                  <Form.Control
                    type='JMBG'
                    value={user.JMBG}
                    disabled='disabled'
                  ></Form.Control>
                </FormGroup>
              )}

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>User Update Warning!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                You have to provide user with JMBG in order to make him admin!
                <FormGroup controlId='JMBG'>
                  <br></br>
                  {JMBG !== undefined && JMBG.length !== 13 && (
                    <Message variant='warning'>
                      JMBG must consist of 13 digits!
                    </Message>
                  )}
                  <br></br>
                  <Form.Control
                    type='JMBG'
                    placeholder='Enter JMBG'
                    value={JMBG}
                    onChange={
                      JMBG !== undefined && JMBG.length !== 13 ? (
                        <Message variant='warning'>
                          JMBG must consist of 13 digits!
                        </Message>
                      ) : (
                        (event) => setJMBG(event.target.value)
                      )
                    }
                  ></Form.Control>
                </FormGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                  Close
                </Button>
                <Button variant='primary' onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>

            <FormGroup controlId='dateOfBirth'>
              <Form.Label>Date of Birth</Form.Label>
              <span className='required'> *</span>
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
            value={dateOfBirth}
            onChange={(event) => setDateOfBirth(event.target.value)}
          ></Form.Control>
        </FormGroup> */}

            <FormGroup controlId='address'>
              <Form.Label>Adress</Form.Label>
              <span className='required'> *</span>
              <Form.Control
                type='address'
                placeholder='Enter adress'
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
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={user.email}
                disabled
              ></Form.Control>
            </FormGroup>

            <Form.Label>
              <span className='required'> * </span>Required fields
            </Form.Label>
            <br></br>
            <Button type='submit' variant='primary'>
              Update User
            </Button>
            {user.JMBG === undefined && (
              <>
                <Form.Label className='mx-5'>OR</Form.Label>
                <Button className='mx-4' variant='primary' onClick={handleShow}>
                  Set user as Admin ?
                </Button>
              </>
            )}
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
