import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  pizzaState: false,
};

const addPizzaSlice = createSlice({
  name: 'addPizza',
  initialState,
  reducers: {
    setIsOpen(state, action) {
      state.isOpen = action.payload;
    },
    setPizzaState(state, action) {
      state.pizzaState = action.payload;
    },
  },
});

export const { setIsOpen, setPizzaState } = addPizzaSlice.actions;

export default addPizzaSlice.reducer;
