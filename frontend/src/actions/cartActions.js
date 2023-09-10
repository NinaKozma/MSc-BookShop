import axios from 'axios'; //trebace mi podaci o proizvodima u korpi

//Action creator function
//Opet se koristi thunk kako bi se slao zahtev serveru
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  //Dispatchuje se reduceru
  dispatch({
    type: 'CART_ADD_ITEM',
    payload: {
      product: data._id,
      title: data.title,
      writer: data.writer,
      image: data.image,
      price: data.price,
      rating: data.rating,
      countInStock: data.countInStock,
      qty,
    },
  });

  //Sacuvaj na local storage-u celu korpu
  //Zato mi je ovde trebao GetState, kako bih sacuvala i kompletne podatke o state tree (dakle, podaci o proizvodima, podaci o korpi, itd.)
  //Mora strigify jer je to inace JSON objekat i njega ne mogu da sacuvam u tom obliku na lokalu
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

//Ovde mi opet treba getState -> kako bih dobila sve proizvode u korpi, i posle uklonila proizvod koji se brise iz lokalnog skladista
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: 'CART_REMOVE_ITEM',
    payload: id,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: 'CART_SAVE_SHIPPING_ADDRESS_ITEM',
    payload: data,
  });

  localStorage.setItem('shippingAdresss', JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: 'CART_SAVE_PAYMENT_METHOD_ITEM',
    payload: data,
  });

  localStorage.setItem('paymentMethod', JSON.stringify(data));
};
