import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) findItem.count++;
      else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
      state.totalCount++;
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        state.totalCount--;
        state.totalPrice -= findItem.price;
        findItem.count--;
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);

      if (!state.items.length) {
        state.totalPrice = 0;
        state.totalCount = 0;
      }
    },
    clearItems(state) {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
