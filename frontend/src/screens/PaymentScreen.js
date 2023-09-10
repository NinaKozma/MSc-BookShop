import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  //Ne mogu biti na paymentu ako nemam shipping address dostupan...
  if (!shippingAddress) {
    history.push('/shipping');
  }

  //Ako postoji u local storage-u, ova polja ce se popuniti sa tim vrednostima
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder'); //nakon toga sledi redirekcija na ovu stranicu
  };

  return (
    <FormContainer>
      {/* prosledjujem trenutni korak i svaki prethodni korak */}
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label={`PayPal`}
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked //po defaultu je ovo checkirano
              onChange={(event) => setPaymentMethod(event.target.value)}
            />{' '}
          </Col>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Contine
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
