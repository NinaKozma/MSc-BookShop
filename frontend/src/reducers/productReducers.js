//Ovaj reducer kao ulazne parametre prima stanje i akciju
//Inicijalno stanje - prazna lista proizvoda
//Kada su podaci uspesno ucitani, oni se smestaju u payload deo akcije!
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case 'PRODUCT_LIST_REQUEST':
      return { loading: true, products: [] };
    case 'PRODUCT_LIST_SUCCESS':
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case 'PRODUCT_LIST_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//Inicijalno stanje prazan objekat proizvoda i prazna lista ocena
export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case 'PRODUCT_DETAILS_REQUEST':
      return { loading: true, ...state };
    case 'PRODUCT_DETAILS_SUCCESS':
      return { loading: false, product: action.payload };
    case 'PRODUCT_DETAILS_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PRODUCT_DELETE_REQUEST':
      return { loading: true };
    case 'PRODUCT_DELETE_SUCCESS':
      return { loading: false, success: true };
    case 'PRODUCT_DELETE_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PRODUCT_CREATE_REQUEST':
      return { loading: true };
    case 'PRODUCT_CREATE_SUCCESS':
      return { loading: false, success: true, product: action.payload };
    case 'PRODUCT_CREATE_FAIL':
      return { loading: false, error: action.payload };
    case 'PRODUCT_CREATE_RESET':
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case 'PRODUCT_UPDATE_REQUEST':
      return { loading: true };
    case 'PRODUCT_UPDATE_SUCCESS':
      return { loading: false, success: true, product: action.payload };
    case 'PRODUCT_UPDATE_FAIL':
      return { loading: false, error: action.payload };
    case 'PRODUCT_UPDATE_RESET':
      return { product: {} };
    default:
      return state;
  }
};

export const productTopRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case 'PRODUCT_TOP_REQUEST':
      return { loading: true, products: [] };
    case 'PRODUCT_TOP_SUCCESS':
      return { loading: false, products: action.payload };
    case 'PRODUCT_TOP_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PRODUCT_CREATE_REVIEW_REQUEST':
      return { loading: true };
    case 'PRODUCT_CREATE_REVIEW_SUCCESS':
      return { loading: false, success: true };
    case 'PRODUCT_CREATE_REVIEW_FAIL':
      return { loading: false, error: action.payload };
    case 'PRODUCT_CREATE_REVIEW_RESET':
      return {};
    default:
      return state;
  }
};

export const productsSortReducer = (state = { itemsSort: [] }, action) => {
  switch (action.type) {
    case 'SORT_PRODUCTS_BY_PRICE_REQUEST':
      return { loading: true };
    case 'SORT_PRODUCTS_BY_PRICE_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        sort: action.payload.sort,
        itemsSort: action.payload.itemsSort,
      };
    case 'SORT_PRODUCTS_BY_PRICE_FAIL':
      return { loading: false, error: action.payload };
    default:
      return { ...state };
  }
};

export const productsFilterReducer = (state = { itemsFilter: [] }, action) => {
  switch (action.type) {
    case 'FILTER_PRODUCTS_BY_PRICE_REQUEST':
      return { loading: true };
    case 'FILTER_PRODUCTS_BY_PRICE_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        price: action.payload.price,
        itemsFilter: action.payload.itemsFilter,
      };
    case 'FILTER_PRODUCTS_BY_PRICE_FAIL':
      return { loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
