import { useAppSelector, useAppDispatch } from "../hooks";
import { RootState } from "../store";

import {
  increment,
  decrement,
  increase,
  toggleCounter,
} from "../store/counter";
import classes from "./Counter.module.css";

function Counter() {
  const dispatch = useAppDispatch();
  const counter = useAppSelector((state: RootState) => state.counter.value);
  const show = useAppSelector((state: RootState) => state.counter.showCounter);

  function incrementHandler() {
    dispatch(increment());
  }

  function increaseHandler() {
    dispatch(increase(10)); // {type: SOME_UNIQUE_IDENTIFIER, payload: 10}
  }

  function decrementHandler() {
    dispatch(decrement());
  }

  function toggleCounterHandler() {
    dispatch(toggleCounter());
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 10</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
}

export default Counter;

// class Counter extends Component {
//   incrementHandler() {
//     this.props.increment();
//   }

//   decrementHandler() {
//     this.props.decrement();
//   }

//   toggleCounterHandler() {}

//   render() {
//     return (
//       <main className={classes.counter}>
//         <h1>Redux Counter</h1>
//         <div className={classes.value}>{this.props.counter}</div>
//         <div>
//           <button onClick={this.incrementHandler.bind(this)}>Increment</button>
//           <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
//         </div>
//         <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
//       </main>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     counter: state.counter
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     increment: () => dispatch({ type: 'increment' }),
//     decrement: () => dispatch({ type: 'decrement' }),
//   }
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Counter);
