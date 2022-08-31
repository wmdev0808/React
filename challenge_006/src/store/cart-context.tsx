import React, { Context } from "react";

export interface Item {
  id: string;
  name: string;
  price: number;
  amount: number;
}

export interface CartContextType {
  items: Item[];
  totalAmount: number;
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const CartContext: Context<CartContextType> = React.createContext({
  items: [] as Item[],
  totalAmount: 0,
  addItem: (_item: any) => {},
  removeItem: (_id: string) => {},
  clearCart: () => {},
});

export default CartContext;
