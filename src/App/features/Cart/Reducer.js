import { ADD_TO_CART, SET_CART, REMOVE_FROM_CART } from "./Constans";

const initialState = [];

const CartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART:
      const isExist = state.filter(
        (cartItem) => cartItem._id === payload._id
      ).length;
      let newCart = [];
      if (isExist) {
        newCart = state.map((cartItem) => {
          if (cartItem._id === payload._id)
            return { ...cartItem, qty: cartItem.qty + 1 };
          return cartItem;
        });
      } else {
        newCart = [...state, payload];
      }

      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;

    case REMOVE_FROM_CART:
      const carts = state
        .map((cartItem) => {
          if (cartItem._id === payload._id) {
            return { ...cartItem, qty: cartItem.qty - 1 };
          }
          return cartItem;
        })
        .filter((cartItem) => cartItem.qty > 0);
      localStorage.setItem("cart", JSON.stringify(carts));
      return carts;
    case SET_CART:
      const newPayload = payload.map(item => ({
        ...item,
        qty: item.qty?item.qty:1
      }))
      console.log(newPayload)
      return newPayload;
    default:
      return state;
  }
};
export default CartReducer;
