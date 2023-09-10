export const publisherListReducer = (state = { publishers: [] }, action) => {
  switch (action.type) {
    case 'PUBLISHER_LIST_REQUEST':
      return { loading: true, publishers: [] };
    case 'PUBLISHER_LIST_SUCCESS':
      return { loading: false, publishers: action.payload };
    case 'PUBLISHER_LIST_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const publisherCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PUBLISHER_CREATE_REQUEST':
      return { loading: true };
    case 'PUBLISHER_CREATE_SUCCESS':
      return { loading: false, success: true, publisher: action.payload };
    case 'PUBLISHER_CREATE_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
