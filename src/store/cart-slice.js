import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    change: false,
  },
  reducers: {
    replaceCart(state, action) {
    state.items = action.payload.items;
    state.totalQuantity = action.payload.totalQuantity
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const exsistingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!exsistingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        exsistingItem.quantity++
          (exsistingItem.totalPrice = exsistingItem.totalPrice + newItem.price);
      }

      state.change = true
    },

    removeItemFromCart(state, action) {
      const id = action.payload;
      const exsistingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (exsistingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== 
        id);
      } else {
        exsistingItem.quantity--
          (exsistingItem.totalPrice =
            exsistingItem.totalPrice - exsistingItem.price);
      }
      state.change = true;
    },
  },
});




export const cartActions = cartSlice.actions;
export default cartSlice;

