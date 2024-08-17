import { cartSlice } from './../store/cart/cart.slice';
import { useTypedSelector } from "./useTypedSelector";

export const useCart = () => useTypedSelector(state => state.cart)