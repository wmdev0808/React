import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import uiSliceReducer from "./ui-slice";
import cartSliceReducer from "./cart-slice";

const store = configureStore({
  reducer: { ui: uiSliceReducer, cart: cartSliceReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
