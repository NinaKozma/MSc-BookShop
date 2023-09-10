import React, { useEffect } from 'react'; //slanje req backendu
import { Link } from 'react-router-dom';
//useDispatch -> dispatch an action
//useSelector -> select parts od state
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Meta from '../components/Meta';

//Props:
//Match mi treba zbog IDija, location zbog qty vrednosti u URIju
//A history zbog redirekcije
const CartScreen = ({ match, location, history }) => {
  //ovo necu uvek imati -> ako odem na obicnu cart page, nemam ID proizvoda
  //Imam ga samo ako sam nesto dodala u korpu pa je doslo do redirekcije
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split('=')[1]) : 1; //qty mi je query param (posle upitnika)

  const dispatch = useDispatch();

  //Iz state izvuci cart, a iz cart izvuci cartItems
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  //Prikazivao mi je proizvode u korpi iako niko nije ulogovan :(
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    //Ako je korisnik ulogovan, ide na shipping
    //Ako nije ulogovan, mora najpre da se loguje!
    history.push('/login?redirect=shipping');
  };
  return (
    <>
      <Meta title='Shopping Cart' />
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty! <Link to='/'>Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.title} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Row>
                        <Link to={`/product/${item.product}`}>
                          <strong>{item.title}</strong>
                        </Link>
                      </Row>
                      <Row>
                        <i>
                          {item.writer
                            ? `${item.writer.firstName}  ${item.writer.lastName}`
                            : item.writer}
                        </i>
                      </Row>
                      <Row>
                        <Rating value={item.rating} />
                      </Row>
                    </Col>
                    <Col md={3}>{item.price} RSD</Col>
                    <Col md={2}>
                      <Form.Control
                        as='select'
                        value={item.qty}
                        onChange={(event) =>
                          dispatch(
                            addToCart(item.product, Number(event.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map(
                          (
                            x //npr, kolicina je 5, onda ce ovo biti [0,1,2,3,4]
                          ) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          )
                        )}
                      </Form.Control>
                    </Col>
                    <Col md={1}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                  <br></br>
                </ListGroup.Item>
              ))}
              <Row>
                <img
                  src='/images/cart.jpg'
                  alt='cart'
                  style={{ marginLeft: '5rem' }}
                />
              </Row>
            </ListGroup>
          )}
        </Col>
        {(cartItems.length !== 0 || userInfo !== null) && (
          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h4>
                    Subtotal (
                    {cartItems.reduce(
                      (accumulator, currentItem) =>
                        accumulator + currentItem.qty,
                      0
                    )}
                    ) items
                  </h4>
                  <h4>
                    For payment:{' '}
                    {cartItems
                      .reduce(
                        (accumulator, currentItem) =>
                          accumulator + currentItem.qty * currentItem.price,
                        0
                      )
                      .toFixed(2)}{' '}
                    RSD
                  </h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn-block'
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed to checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        )}
      </Row>
    </>
  );
};

export default CartScreen;
