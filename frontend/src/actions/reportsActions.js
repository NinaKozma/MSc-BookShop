import axios from 'axios';

export const listReports = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'REPORTS_LIST_REQUEST' }); //reduceru

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/reports', config); //zahtev ka serveru

    dispatch({
      type: 'REPORTS_LIST_SUCCESS',
      payload: data,
    }); //reduceru
  } catch (error) {
    dispatch({
      type: 'REPORTS_LIST_FAIL',
      //ako postoji backend error, ispisi poruku vezanu za njega!
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
