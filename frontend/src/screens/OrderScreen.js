import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Modal,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../actions/orderActions';
import Meta from '../components/Meta';

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, succes: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, succes: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    }

    //Kreiranje paypal skripte
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal'); //backend vraca client id (env)
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        //kada je skripta ucitana, postavi sdk na true
        setSdkReady(true);
      };

      document.body.appendChild(script);
    };

    //Ako smo tek dosli na stranicu ili ako smo dosli na stranicu, pa platili, ili ako je porudzbina dostavljena, ucitaj...
    if (!order || successPay || successDeliver || orderId !== order._id) {
      dispatch({ type: 'ORDER_PAY_RESET' });
      dispatch({ type: 'ORDER_DELIVER_RESET' });
      dispatch(getOrderDetails(orderId)); //ponovo ucitava porudzbinu, ali sada kao placenu ili dostavljenu
    } else if (!order.isPaid) {
      //ako porudzbina nije placena, dodaje skript kako bismo platili
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, history, userInfo, orderId, successPay, successDeliver, order]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
    dispatch(getOrderDetails());
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
    dispatch(getOrderDetails());
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <Meta title='Order' />
      <h1>Order ID: {order._id}</h1>
      <Row onLoad={handleShow}>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <strong>First name: </strong>
              {order.user.firstName}
              <br></br>
              <strong>Last name: </strong>
              {order.user.lastName}
              <br></br>
              <strong>Email: </strong>
              <a href={`mailto:${userInfo.email}`}>{order.user.email}</a>
              <br></br>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}!
                </Message>
              ) : (
                <Message variant='danger'>Not delivered!</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}!</Message>
              ) : (
                <Message variant='danger'>Not paid!</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty!</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.title}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.title}
                          </Link>
                        </Col>
                        <Col md={5}>
                          {item.qty} x {item.price} RSD ={' '}
                          {item.qty * item.price} RSD
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>{order.itemsPrice} RSD</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>{order.shippingPrice} RSD</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>{order.taxPrice} RSD</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  {order.itemsPrice + order.shippingPrice + order.taxPrice >
                  order.totalPrice ? (
                    <>
                      <Col md={6}>
                        {Number(order.totalPrice).toFixed(2)} RSD
                      </Col>
                      <Col className='text-center py-3' md={12}>
                        <Message variant='info'>
                          Calculated 15% discount on total price!
                        </Message>
                      </Col>
                    </>
                  ) : (
                    <Col md={6}>{Number(order.totalPrice).toFixed(2)} RSD</Col>
                  )}
                </Row>
              </ListGroup.Item>
              {!order.isPaid && /*order.user === userInfo._id &&*/ (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={Number(order.totalPrice).toFixed(2)}
                      onSuccess={successPaymentHandler}
                    ></PayPalButton>
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo && userInfo.JMBG && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn btn-block'
                    onClick={deliverHandler}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
      {order.isPaid === false &&
        order.isDelivered === false &&
        userInfo.JMBG === undefined && (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Thank you for your trust!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              You have successfully made your order! Ordered products will be
              delivered as soon as you make your payment! Thank you for your
              trust, once again!
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleClose}>
                Close
              </Button>
              <Button variant='primary' onClick={handleClose}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        )}
    </>
  );
};

export default OrderScreen;
