import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import cart from "./slices/cartSlice";
import addPizza from './slices/addPizzaSlice'

export const store = configureStore({
  reducer: {
    filter,
    cart,
    addPizza
  },
});
