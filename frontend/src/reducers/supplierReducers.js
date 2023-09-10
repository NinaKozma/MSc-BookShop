export const supplierListReducer = (state = { suppliers: [] }, action) => {
  switch (action.type) {
    case 'SUPPLIER_LIST_REQUEST':
      return { loading: true, suppliers: [] };
    case 'SUPPLIER_LIST_SUCCESS':
      return { loading: false, suppliers: action.payload };
    case 'SUPPLIER_LIST_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const supplierCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SUPPLIER_CREATE_REQUEST':
      return { loading: true };
    case 'SUPPLIER_CREATE_SUCCESS':
      return { loading: false, success: true, supplier: action.payload };
    case 'SUPPLIER_CREATE_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
