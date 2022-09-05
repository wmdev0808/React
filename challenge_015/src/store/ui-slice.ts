import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Notification {
  status: "error" | "pending" | "success";
  title: string;
  message: string;
}

export interface UIState {
  cartIsVisible: boolean;
  notification: Notification | null;
}

const initialUIState: UIState = {
  cartIsVisible: false,
  notification: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUIState,
  reducers: {
    toggle(state: UIState) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    showNotification(state: UIState, action: PayloadAction<Notification>) {
      state.notification = action.payload;
    },
  },
});

export const { showNotification, toggle } = uiSlice.actions;
export default uiSlice.reducer;
