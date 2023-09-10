import axios from 'axios';

export const listWriters = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'WRITER_LIST_REQUEST' }); //reduceru

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/writers', config); //zahtev ka serveru

    dispatch({
      type: 'WRITER_LIST_SUCCESS',
      payload: data,
    }); //reduceru
  } catch (error) {
    dispatch({
      type: 'WRITER_LIST_FAIL',
      //ako postoji backend error, ispisi poruku vezanu za njega!
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createWriter = (productId, writer) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'WRITER_CREATE_REQUEST',
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
      `/api/products/${productId}/writers`,
      writer,
      config
    );

    dispatch({
      type: 'WRITER_CREATE_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'WRITER_CREATE_FAIL',
      //ako postoji backend error, ispisi poruku vezanu za njega!
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
