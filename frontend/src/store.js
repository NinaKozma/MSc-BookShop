//Povezivanje Reducera...
import { createStore, combineReducers, applyMiddleware } from 'redux';
//Thunk je middleware koji mi omogucava da saljem async zahteve serveru u action creators funkcijama
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productTopRatedReducer,
  productCreateReviewReducer,
  productsSortReducer,
  productsFilterReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderMyListReducer,
  orderListReducer,
} from './reducers/orderReducers';
import {
  writerListReducer,
  writerCreateReducer,
} from './reducers/writerReducers';
import { genreListReducer, genreCreateReducer } from './reducers/genreReducers';
import {
  supplierListReducer,
  supplierCreateReducer,
} from './reducers/supplierReducers';
import {
  publisherListReducer,
  publisherCreateReducer,
} from './reducers/publisherReducers';
import { reportsListReducer } from './reducers/reportsReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productTopRated: productTopRatedReducer,
  productCreateReview: productCreateReviewReducer,
  productsSort: productsSortReducer,
  productsFilter: productsFilterReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderMyList: orderMyListReducer,
  orderList: orderListReducer,
  writerList: writerListReducer,
  writerCreate: writerCreateReducer,
  genreList: genreListReducer,
  genreCreate: genreCreateReducer,
  publisherList: publisherListReducer,
  publisherCreate: publisherCreateReducer,
  supplierList: supplierListReducer,
  supplierCreate: supplierCreateReducer,
  reportsList: reportsListReducer,
});

//Ako postoje items u korpi na lokalnom storagu, pokupi; inace, prazna lista
//Ti podaci su na lokalu sacuvani kao string -> konverzija u JSON
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

//Ako postoje korisnici na lokalnom storagu, pokupi; inace, prazan objekat
//Ti podaci su na lokalu sacuvani kao string -> konverzija u JSON
const userInfoItemsFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: {
    userInfo: userInfoItemsFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
