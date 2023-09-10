import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
//useDispatch -> dispatch an action
//useSelector -> select parts od state
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import Paginate from '../components/Paginate';
import {
  filterProducts,
  listProducts,
  sortProducts,
} from '../actions/productActions';
import ProductCarousel from '../components/ProductCarousel';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  //Iz state-a, uzmi productList, a iz njega loading, products i error
  const productList = useSelector((state) => state.productList);
  const { loading, products, error, page, pages } = productList;

  const productsSort = useSelector((state) => state.productsSort);
  const { itemsSort } = productsSort;

  const productsFilter = useSelector((state) => state.productsFilter);
  const { itemsFilter } = productsFilter;

  //useEffect potreban za slanje req backendu
  //ovo se pokrece cim se komponenta ucita
  useEffect(() => {
    //poziva listProducts akciju i popunjava state sa backend datom
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <>
          <h2 style={{ fontFamily: 'Fredericka the Great' }}>
            Readers' choice
          </h2>
          <ProductCarousel />
          <br></br>
          <Row>
            <Col>
              <h2 style={{ fontFamily: 'Fredericka the Great' }}>
                New arrivals!{' '}
              </h2>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Link to='/' className='btn btn-light'>
            Go Back
          </Link>
          <h2>Search Results: {products.length} found</h2>
          {products.length === 0 && (
            <img
              src='/images/search.webp'
              alt='no_search_results'
              height='400px'
              style={{ marginLeft: '15rem' }}
            />
          )}
        </>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {keyword === undefined && (
              <div
                className='filter'
                style={{
                  marginLeft: '0.9em',
                  fontSize: '1.1rem',
                  textAlign: 'center',
                }}
              >
                <div className='filter-sort' style={{ display: 'inline' }}>
                  Sort Products{' '}
                  <select
                    onChange={(e) => {
                      dispatch(sortProducts(products, e.target.value));
                      itemsFilter.length = 0;
                    }}
                  >
                    <option value='latest'>Latest</option>
                    <option value='lowest'>Lowest</option>
                    <option value='Highest'>Highest</option>
                  </select>
                </div>
                <div
                  className='filter-price'
                  style={{
                    marginLeft: '1rem',
                    display: 'inline',
                  }}
                >
                  Filter Products{' '}
                  <select
                    onChange={(e) => {
                      dispatch(filterProducts(products, e.target.value));
                      itemsSort.length = 0;
                    }}
                  >
                    <option value=''>All products</option>
                    <option value='800'>Less than 800 RSD</option>
                    <option value='900'>Less than 900 RSD</option>
                    <option value='1000'>Less than 1000 RSD</option>
                    <option value='1100'>Less than 1100 RSD</option>
                    <option value='1200'>Less than 1200 RSD</option>
                  </select>
                </div>
              </div>
            )}
          </Row>

          <Row>
            {itemsFilter.length !== 0 && keyword === undefined
              ? itemsFilter.map((item) => (
                  <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={item} />
                  </Col>
                ))
              : itemsSort.length !== 0 && keyword === undefined
              ? itemsSort.map((item) => (
                  <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={item} />
                  </Col>
                ))
              : products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
          </Row>

          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          ></Paginate>
        </>
      )}
    </>
  );
};

export default HomeScreen;
