import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions';

//history se koristi za redirekciju
const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const { success: successProductReview, error: errorProductReview } =
    productCreateReview;

  //korisnik mora da bude ulogovan kako bi ostavio recenziju...
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [readMore, setReadMore] = useState(false);
  const linkName = readMore ? 'Read Less << ' : 'Read More >> ';

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment('');
      setMessage('');
      dispatch({ type: 'PRODUCT_CREATE_REVIEW_RESET' });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]); //DEPENDENCIES -> FIRES OFF WHEN SOMETHNIG OF LISTED CHANGES!

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (comment === '') {
      setMessage('Rating comment is required!');
    }

    dispatch(createProductReview(match.params.id, { rating, comment }));
  };

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.title} />
          <Row>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Image src={product.image} alt={product.title} fluid />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={5}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h4 style={{ fontFamily: 'Prata' }}>{product.title}</h4>
                  <h4>
                    <i style={{ fontFamily: 'Cinzel Decorative' }}>
                      {product.writer
                        ? `${product.writer.firstName}  ${product.writer.lastName}`
                        : product.writer}
                    </i>
                  </h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  Genre: {product.genre ? product.genre.name : product.genre}
                </ListGroup.Item>
                <ListGroup.Item>
                  Number of pages: {product.numberOfPages}
                </ListGroup.Item>
                <ListGroup.Item>Language: {product.language}</ListGroup.Item>

                <ListGroup.Item>Price: {product.price} RSD</ListGroup.Item>
                <ListGroup.Item
                  style={{
                    fontFamily: 'Prata',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    textAlign: 'justify',
                  }}
                >
                  Description:{' '}
                  {!readMore
                    ? String(product.description).slice(0, 140) + '...'
                    : product.description}
                  {/* eslint-disable-next-line */}
                  <a
                    onClick={() => {
                      setReadMore(!readMore);
                    }}
                  >
                    <h6>{linkName}</h6>
                  </a>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>{product.price} RSD</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row style={{ alignItems: 'center' }}>
                      <Col>Available:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row style={{ alignItems: 'center' }}>
                        <Col>Quantity:</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(event) => setQty(event.target.value)} //postavi kolicinu na onoliko na koliko sam kliknula
                          >
                            {[...Array(product.countInStock).keys()].map(
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
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add to cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
              <br></br>
              {product.countInStock === 0 && (
                <Button
                  style={{
                    background: 'white',
                    borderWidth: '0.1rem',
                    borderColor: 'black',
                  }}
                >
                  <a
                    href='https://www.pdfdrive.com/'
                    rel='noreferrer'
                    target='_blank'
                  >
                    Looking for an Online Boook instead? 📖
                  </a>
                </Button>
              )}
            </Col>
          </Row>
          {
            <Row>
              <Col md={6}>
                <h2>Reviews</h2>
                {product.reviews.length === 0 && (
                  <Message>No Reviews Yet.</Message>
                )}
                <ListGroup variant='flush'>
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating}></Rating>
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h2>Write a Customer Review</h2>
                    {message ? (
                      <Message variant='danger'>{message}</Message>
                    ) : (
                      errorProductReview && (
                        <Message variant='danger'>{errorProductReview}</Message>
                      )
                    )}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId='rating'>
                          <Form.Label>Rating</Form.Label>
                          <span className='required'> * </span>
                          <Form.Control
                            as='select'
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value=''>Select...</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='comment'>
                          <Form.Label>Comment</Form.Label>
                          <span className='required'> * </span>
                          <Form.Control
                            as='textarea'
                            row='5'
                            placeholder='Insert review comment here...'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary'>
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to='/login'>Sign In</Link> to write a
                        review
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col></Col>
              <Col md={5} fluid>
                <img
                  src='/images/review.jpg'
                  alt='alternative'
                  fluid
                  height='500px'
                  weight='300px'
                />
              </Col>
            </Row>
          }
        </>
      )}
    </>
  );
};

export default ProductScreen;
