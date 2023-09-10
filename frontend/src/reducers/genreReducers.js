export const genreListReducer = (state = { genres: [] }, action) => {
  switch (action.type) {
    case 'GENRE_LIST_REQUEST':
      return { loading: true, genres: [] };
    case 'GENRE_LIST_SUCCESS':
      return { loading: false, genres: action.payload };
    case 'GENRE_LIST_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const genreCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GENRE_CREATE_REQUEST':
      return { loading: true };
    case 'GENRE_CREATE_SUCCESS':
      return { loading: false, success: true, genre: action.payload };
    case 'GENRE_CREATE_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
