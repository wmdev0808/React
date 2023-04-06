import { Actions, initStore } from "./store";

interface CounterState {
  counter: number;
}

const configureStore = () => {
  const actions: Actions<CounterState> = {
    ADD: (state: CounterState, amount: number): CounterState => ({
      counter: state.counter + amount,
    }),
    SUB: (state: CounterState, amount: number): CounterState => ({
      counter: state.counter - amount,
    }),
  };

  initStore(actions, { counter: 0 });
};

export default configureStore;
