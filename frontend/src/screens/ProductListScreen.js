import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions';
import Meta from '../components/Meta';

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: 'PRODUCT_CREATE_RESET' });

    if (!userInfo || !userInfo.JMBG) {
      history.push('/login');
    } else if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts('', pageNumber)); //prazan string je za keywords, koje ovde nemam
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);
  //ovaj dependency za brisanje proizvoda je ovde kako bi se lista proizvoda azurirala nakon sto ja neki proizvod obrisem

  const deleteHandler = (id) => {
    handleClose();
    dispatch(deleteProduct(id));
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Meta title='All Products' />
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr style={{ background: 'rgb(247,221,220)' }}>
                <th>PRODUCT ID</th>
                <th>TITLE</th>
                <th>WRITER</th>
                <th>GENRE</th>
                <th>PUBLISHER</th>
                <th>PRICE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.title}</td>
                  <td>
                    {product.writer
                      ? `${product.writer.firstName}  ${product.writer.lastName}`
                      : product.writer}
                  </td>
                  <td style={{ textTransform: 'capitalize' }}>
                    {product.genre ? product.genre.name : product.genre}
                  </td>
                  <td>
                    {product.publisher
                      ? product.publisher.name
                      : product.publisher}
                  </td>
                  <td>{product.price} RSD</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => handleShow}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                    {show === true && (
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>
                            You are about to delete a product!
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          Are you sure you want to delete this product?
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant='secondary' onClick={handleClose}>
                            Close
                          </Button>
                          <Button
                            variant='primary'
                            onClick={() => deleteHandler(product._id)}
                          >
                            Confirm
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    )}
                    ;
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate
            pages={pages}
            page={page}
            JMBG={userInfo ? userInfo.JMBG : null}
          ></Paginate>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
