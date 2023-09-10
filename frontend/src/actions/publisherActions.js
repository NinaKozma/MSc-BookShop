import axios from 'axios';

export const listPublishers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'PUBLISHER_LIST_REQUEST' }); //reduceru

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/publishers', config); //zahtev ka serveru

    dispatch({
      type: 'PUBLISHER_LIST_SUCCESS',
      payload: data,
    }); //reduceru
  } catch (error) {
    dispatch({
      type: 'PUBLISHER_LIST_FAIL',
      //ako postoji backend error, ispisi poruku vezanu za njega!
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createPublisher = (productId, publisher) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: 'PUBLISHER_CREATE_REQUEST',
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
      `/api/products/${productId}/publishers`,
      publisher,
      config
    );

    dispatch({
      type: 'PUBLISHER_CREATE_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'PUBLISHER_CREATE_FAIL',
      //ako postoji backend error, ispisi poruku vezanu za njega!
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
