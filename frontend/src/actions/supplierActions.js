import axios from 'axios';

export const listSuppliers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'SUPPLIER_LIST_REQUEST' }); //reduceru

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/suppliers', config); //zahtev ka serveru

    dispatch({
      type: 'SUPPLIER_LIST_SUCCESS',
      payload: data,
    }); //reduceru
  } catch (error) {
    dispatch({
      type: 'SUPPLIER_LIST_FAIL',
      //ako postoji backend error, ispisi poruku vezanu za njega!
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createSupplier = (productId, supplier) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: 'SUPPLIER_CREATE_REQUEST',
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

    const { data } = await axios.post(
      `/api/products/${productId}/suppliers`,
      supplier,
      config
    );

    dispatch({
      type: 'SUPPLIER_CREATE_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'SUPPLIER_CREATE_FAIL',
      //ako postoji backend error, ispisi poruku vezanu za njega!
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
