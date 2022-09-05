import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Item {
  id: string;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

export interface CartState {
  items: Item[];
  totalQuantity: number;
  changed: boolean;
}

const initialCartState: CartState = {
  items: [],
  totalQuantity: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    replaceCart(
      state: CartState,
      action: PayloadAction<{ totalQuantity: number; items: Item[] }>
    ) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(
      state: CartState,
      action: PayloadAction<{ id: string; name: string; price: number }>
    ) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity!++;
        existingItem.totalPrice = existingItem.totalPrice! + newItem.price;
      }
    },
    removeItemFromCart(state: CartState, action: PayloadAction<string>) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      state.totalQuantity--;
      state.changed = true;
      if (existingItem!.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem!.quantity!--;
        existingItem!.totalPrice =
          existingItem!.totalPrice! - existingItem!.price;
      }
    },
  },
});

export const { addItemToCart, removeItemFromCart, replaceCart } =
  cartSlice.actions;
export default cartSlice.reducer;
