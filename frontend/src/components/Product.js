import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <>
      <Card
        className='my-3 p-1 rounded'
        style={{ width: '15rem', height: '33rem', display: 'grid' }}
      >
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant='top' />
        </Link>
        <Card.Body style={{ display: 'grid' }}>
          <Link to={`/product/${product._id}`}>
            <Card.Title as='div'>
              <h5>{product.title}</h5>
            </Card.Title>
          </Link>
          <Card.Text as='div'>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>
          <br></br>
          <Card.Text as='h5' style={{ fontWeight: 'bold' }}>
            Price: {product.price} RSD
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
