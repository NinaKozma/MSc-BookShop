import axios from 'axios';

export const listGenres = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'GENRE_LIST_REQUEST' }); //reduceru

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/genres', config); //zahtev ka serveru

    dispatch({
      type: 'GENRE_LIST_SUCCESS',
      payload: data,
    }); //reduceru
  } catch (error) {
    dispatch({
      type: 'GENRE_LIST_FAIL',
      //ako postoji backend error, ispisi poruku vezanu za njega!
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createGenre = (productId, genre) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'GENRE_CREATE_REQUEST',
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
      `/api/products/${productId}/genres`,
      genre,
      config
    );

    dispatch({
      type: 'GENRE_CREATE_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'GENRE_CREATE_FAIL',
      //ako postoji backend error, ispisi poruku vezanu za njega!
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
