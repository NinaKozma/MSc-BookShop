export const reportsListReducer = (state = { reports: [] }, action) => {
  switch (action.type) {
    case 'REPORTS_LIST_REQUEST':
      return { loading: true, reports: [] };
    case 'REPORTS_LIST_SUCCESS':
      return { loading: false, reports: action.payload };
    case 'REPORTS_LIST_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
