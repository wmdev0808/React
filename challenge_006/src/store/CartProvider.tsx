import { ReactNode, useReducer } from "react";

import CartContext, { CartContextType, Item } from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

interface CartState {
  items: Item[];
  totalAmount: number;
}

enum CartActionTypes {
  ADD = "ADD",
  REMOVE = "REMOVE",
  CLEAR = "CLEAR",
}

type CartActionType = keyof typeof CartActionTypes;

interface CartAction {
  type: CartActionType;
  item?: Item;
  id?: string;
}

const cartReducer = (state: CartState, action: CartAction): CartState => {
  if (action.type === CartActionTypes.ADD) {
    if (action.item) {
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item?.id
      );
      const exsitingCartItem = state.items[existingCartItemIndex];

      let updatedItems;

      if (exsitingCartItem) {
        const updatedItem = {
          ...exsitingCartItem,
          amount: exsitingCartItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
  }

  if (action.type === CartActionTypes.REMOVE) {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;

    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === CartActionTypes.CLEAR) {
    return defaultCartState;
  }

  return defaultCartState;
};

interface CartProviderProps {
  children?: ReactNode;
}

const CartProvider = (props: CartProviderProps) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item: Item) => {
    dispatchCartAction({ type: CartActionTypes.ADD, item });
  };

  const removeItemFromCartHandler = (id: string) => {
    dispatchCartAction({ type: CartActionTypes.REMOVE, id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: CartActionTypes.CLEAR });
  };

  const cartContext: CartContextType = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
