import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button, FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { listWriters } from '../actions/writerActions';
import { listGenres } from '../actions/genreActions';
import { listSuppliers } from '../actions/supplierActions';
import { listPublishers } from '../actions/publisherActions';
import Meta from '../components/Meta';

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('');
  const [genre, setGenre] = useState('');
  const [publisher, setPublisher] = useState('');
  const [supplier, setSupplier] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [language, setLanguage] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  const [message, setMessage] = useState();

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const writerList = useSelector((state) => state.writerList);
  const { writers } = writerList;

  const genreList = useSelector((state) => state.genreList);
  const { genres } = genreList;

  const supplierList = useSelector((state) => state.supplierList);
  const { suppliers } = supplierList;

  const publisherList = useSelector((state) => state.publisherList);
  const { publishers } = publisherList;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: 'PRODUCT_UPDATE_RESET' });
      history.push('/admin/productlist');
    } else {
      if (!product.title || product._id !== productId) {
        dispatch(listSuppliers());
        dispatch(listGenres());
        dispatch(listPublishers());
        dispatch(listWriters());
        dispatch(listProductDetails(productId));
      } else {
        setTitle(product.title);
        setWriter(product.writer);
        setGenre(product.genre);
        setPublisher(product.publisher);
        setSupplier(product.supplier);
        setDescription(product.description);
        setPrice(product.price);
        setNumberOfPages(product.numberOfPages);
        setLanguage(product.language);
        setCountInStock(product.countInStock);
        setImage(product.image);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]; //prva slika u array-y

    const formData = new FormData();
    formData.append('image', file); //ime je image, kao i na backu
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data); //za sliku postavlja putanju!
      setUploading(false);
    } catch (uploadFileError) {
      console.log(uploadFileError);
      setUploading(false);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault(); //kako se stranica ne bi refreshovala

    if (title === '') {
      setMessage('Title is required');
    } else if (description === '') {
      setMessage('Description is required!');
    } else if (price === '') {
      setMessage('Price is required!');
    } else if (price <= 0) {
      setMessage('Price must have a greater value than 0!');
    } else if (numberOfPages === '') {
      setMessage('Number of pages is required!');
    } else if (numberOfPages <= 0) {
      setMessage('Number of pages must have a greater value than 0!');
    } else if (language === '') {
      setMessage('Language is required!');
    } else if (!/^[a-zA-Z]+$/.test(language)) {
      setMessage('Book language can only contain letters!');
    } else if (countInStock === '') {
      setMessage('Count in stock is required!');
    } else if (countInStock < 0) {
      setMessage('Count in stock must have a positive value!');
    } else {
      dispatch(
        updateProduct({
          _id: productId,
          title,
          writer,
          genre,
          publisher,
          supplier,
          description,
          price,
          numberOfPages,
          language,
          countInStock,
          image,
        })
      );
    }
  };

  return (
    <>
      <Meta title='Edit Product' />
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Product</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <FormGroup controlId='title'>
              <Form.Label>Title</Form.Label>
              <span className='required'> *</span>
              <Form.Control
                type='title'
                placeholder='Enter title'
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              ></Form.Control>
            </FormGroup>
            <FormGroup controlId='writer'>
              <Form.Label>Writer</Form.Label>
              <span className='required'> *</span>
              <Row>
                <Col md={7}>
                  <Form.Control
                    as='select'
                    type='writer'
                    placeholder='Enter writer'
                    onChange={(event) => setWriter(event.target.value)}
                  >
                    {writers.map((writer) => (
                      <option
                        value={writer._id}
                      >{`${writer.firstName} ${writer.lastName}`}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col className='text-right' md={5}>
                  <LinkContainer to={`/admin/product/${productId}/writers`}>
                    <Button variant='outline-dark' className='btn-l'>
                      <i className='fas fa-plus'></i> Add a writer
                    </Button>
                  </LinkContainer>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup controlId='genre'>
              <Form.Label>Genre</Form.Label>
              <span className='required'> *</span>
              <Row>
                <Col md={7}>
                  <Form.Control
                    as='select'
                    type='genre'
                    placeholder='Enter genre'
                    style={{ textTransform: 'capitalize' }}
                    onChange={(event) => setGenre(event.target.value)}
                  >
                    {genres.map((genre) => (
                      <option value={genre._id}>{genre.name}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col className='text-right' md={5}>
                  <LinkContainer to={`/admin/product/${productId}/genres`}>
                    <Button variant='outline-dark' className='btn-l'>
                      <i className='fas fa-plus'></i> Add a genre
                    </Button>
                  </LinkContainer>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup controlId='publisher'>
              <Form.Label>Publisher</Form.Label>
              <span className='required'> *</span>
              <Row>
                <Col md={7}>
                  <Form.Control
                    as='select'
                    type='publisher'
                    placeholder='Enter publisher'
                    valueKey={product.publisher && product.publisher.name}
                    onChange={(event) => setPublisher(event.target.value)}
                  >
                    {publishers.map((publisher) => (
                      <option value={publisher._id}>{publisher.name}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col className='text-right' md={5}>
                  <LinkContainer to={`/admin/product/${productId}/publishers`}>
                    <Button variant='outline-dark' className='btn-l'>
                      <i className='fas fa-plus'></i> Add a publisher
                    </Button>
                  </LinkContainer>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup controlId='supplier'>
              <Form.Label>Supplier</Form.Label>
              <span className='required'> *</span>
              <Row>
                <Col md={7}>
                  <Form.Control
                    as='select'
                    type='supplier'
                    placeholder='Enter supplier'
                    onChange={(event) => setSupplier(event.target.value)}
                  >
                    {suppliers.map((supplier) => (
                      <option value={supplier._id}>{supplier.name}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col className='text-right' md={5}>
                  <LinkContainer to={`/admin/product/${productId}/suppliers`}>
                    <Button variant='outline-dark' className='btn-l'>
                      <i className='fas fa-plus'></i> Add a supplier
                    </Button>
                  </LinkContainer>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup controlId='description'>
              <Form.Label>Description</Form.Label>
              <span className='required'> *</span>
              <Form.Control
                as='textarea'
                rows={5}
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              ></Form.Control>
            </FormGroup>
            <FormGroup controlId='price'>
              <Form.Label>Price</Form.Label>
              <span className='required'> *</span>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              ></Form.Control>
            </FormGroup>
            <FormGroup controlId='numberOfPages'>
              <Form.Label>Number of pages</Form.Label>
              <span className='required'> *</span>
              <Form.Control
                type='number'
                placeholder='Enter numberOfPages'
                value={numberOfPages}
                onChange={(event) => setNumberOfPages(event.target.value)}
              ></Form.Control>
            </FormGroup>
            <FormGroup controlId='language'>
              <Form.Label>Language</Form.Label>
              <span className='required'> *</span>
              <Form.Control
                type='text'
                placeholder='Enter language'
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
              ></Form.Control>
            </FormGroup>
            <FormGroup controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <span className='required'> *</span>
              <Form.Control
                type='number'
                placeholder='Enter count in stock'
                value={countInStock}
                onChange={(event) => setCountInStock(event.target.value)}
              ></Form.Control>
            </FormGroup>
            <FormGroup controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(event) => setImage(event.target.value)}
              ></Form.Control>
              <br></br>
              <Form.File
                id='image-file'
                label='Choose A Image File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </FormGroup>
            <Form.Label>
              <span className='required'> * </span>Required fields
            </Form.Label>
            <br></br>
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
