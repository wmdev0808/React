import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
  showCounter: boolean;
}

const initialCounterState: CounterState = {
  value: 0,
  showCounter: true,
};

const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
    increase(state, action: PayloadAction<number>) {
      state.value = state.value + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

export const { increment, decrement, increase, toggleCounter } =
  counterSlice.actions;
export default counterSlice.reducer;
