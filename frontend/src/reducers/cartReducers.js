//Ovaj reducer kao ulazne parametre prima stanje i akciju
//Inicijalno stanje - prazna lista proizvoda u korpi
export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      const item = action.payload; //podaci o proizvodu, ID je .product

      //Za svaki item u korpi, proveri da li je njegov ID (a to je zapravo product ovde) jednak IDu trenutnog itema
      //Odnosno, da li taj proizvod koji dodajemo postoji vec u korpi...
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        //Map funkcijom prolazi kroz items u korpi, ako je ID trenutnog itema
        //u iteraciji jednak IDiju existProducta, onda vrati item, inace vrati x (ostaje isto)
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        //ako ne postoji, savuvaj trenutno stanje korpe i dodaj trenutni item u nju
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case 'CART_REMOVE_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload), //vratice sve proizvode osim onog koji uklanjamo
      };
    case 'CART_SAVE_SHIPPING_ADDRESS_ITEM':
      return {
        ...state,
        shippingAddress: action.payload, //data iz forme
      };
    case 'CART_SAVE_PAYMENT_METHOD_ITEM':
      return {
        ...state,
        paymentMethod: action.payload, //data iz forme
      };
    case 'CART_RESET':
      return {
        cartItems: [],
      };
    default:
      return state;
  }
};
