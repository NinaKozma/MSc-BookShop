import axios from 'axios';

//Action creator function
//Ovde sam koristila thunk jer imam funkciju u funkciji
//Thunk je middleware koji mi omogucava da saljem async zahteve serveru u action creators funkcijama
export const listProducts =
  (keyword = '', pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: 'PRODUCT_LIST_REQUEST' }); //reduceru

      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      ); //zahtev ka serveru

      dispatch({
        type: 'PRODUCT_LIST_SUCCESS',
        payload: data,
      }); //reduceru
    } catch (error) {
      dispatch({
        type: 'PRODUCT_LIST_FAIL',
        //ako postoji backend error, ispisi poruku vezanu za njega!
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'PRODUCT_DETAILS_REQUEST' }); //reduceru

    const { data } = await axios.get(`/api/products/${id}`); //zahtev ka serveru

    dispatch({
      type: 'PRODUCT_DETAILS_SUCCESS',
      payload: data,
    }); //reduceru
  } catch (error) {
    dispatch({
      type: 'PRODUCT_DETAILS_FAIL',
      //ako postoji backend error, ispisi poruku vezanu za njega!
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'PRODUCT_DELETE_REQUEST',
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({
      type: 'PRODUCT_DELETE_SUCCESS',
    });
  } catch (error) {
    dispatch({
      type: 'PRODUCT_DELETE_FAIL',
      //ako postoji backend error, ispisi poruku vezanu za njega!
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'PRODUCT_CREATE_REQUEST',
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products`, {}, config);

    dispatch({
      type: 'PRODUCT_CREATE_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'PRODUCT_CREATE_FAIL',
      //ako postoji backend error, ispisi poruku vezanu za njega!
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'PRODUCT_UPDATE_REQUEST',
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch({
      type: 'PRODUCT_UPDATE_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'PRODUCT_UPDATE_FAIL',
      //ako postoji backend error, ispisi poruku vezanu za njega!
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: 'PRODUCT_TOP_REQUEST' }); //reduceru

    const { data } = await axios.get('/api/products/top'); //zahtev ka serveru

    dispatch({
      type: 'PRODUCT_TOP_SUCCESS',
      payload: data,
    }); //reduceru
  } catch (error) {
    dispatch({
      type: 'PRODUCT_TOP_FAIL',
      //ako postoji backend error, ispisi poruku vezanu za njega!
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: 'PRODUCT_CREATE_REVIEW_REQUEST' }); //reduceru

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`/api/products/${productId}/reviews`, review, config); //zahtev ka serveru

      dispatch({
        type: 'PRODUCT_CREATE_REVIEW_SUCCESS',
      }); //reduceru
    } catch (error) {
      dispatch({
        type: 'PRODUCT_CREATE_REVIEW_FAIL',
        //ako postoji backend error, ispisi poruku vezanu za njega!
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const sortProducts = (products, sort) => async (dispatch) => {
  try {
    dispatch({ type: 'SORT_PRODUCTS_BY_PRICE_REQUEST' });

    const sortedProducts = [...products];

    if (sort === 'latest') {
      sortedProducts.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
    } else {
      sortedProducts.sort((a, b) =>
        sort === 'lowest'
          ? a.price > b.price
            ? 1
            : -1
          : a.price > b.price
          ? -1
          : 1
      );
    }
    console.log(sortedProducts);
    dispatch({
      type: 'SORT_PRODUCTS_BY_PRICE_SUCCESS',
      payload: {
        sort: sort,
        itemsSort: sortedProducts,
      },
    });
  } catch (error) {
    dispatch({
      type: 'SORT_PRODUCTS_BY_PRICE_FAIL',
      //ako postoji backend error, ispisi poruku vezanu za njega!
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const filterProducts = (products, price) => async (dispatch) => {
  try {
    dispatch({ type: 'FILTER_PRODUCTS_BY_PRICE_REQUEST' });

    dispatch({
      type: 'FILTER_PRODUCTS_BY_PRICE_SUCCESS',
      payload: {
        price: price,
        itemsFilter:
          price === ''
            ? products
            : products.filter((product) => product.price < price),
      },
    });
  } catch (error) {
    dispatch({
      type: 'FILTER_PRODUCTS_BY_PRICE_FAIL',
      //ako postoji backend error, ispisi poruku vezanu za njega!
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
