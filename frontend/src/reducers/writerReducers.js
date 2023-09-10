export const writerListReducer = (state = { writers: [] }, action) => {
  switch (action.type) {
    case 'WRITER_LIST_REQUEST':
      return { loading: true, writers: [] };
    case 'WRITER_LIST_SUCCESS':
      return { loading: false, writers: action.payload };
    case 'WRITER_LIST_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const writerCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'WRITER_CREATE_REQUEST':
      return { loading: true };
    case 'WRITER_CREATE_SUCCESS':
      return { loading: false, success: true, writer: action.payload };
    case 'WRITER_CREATE_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
