import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../store";

import { toggle } from "../../store/ui-slice";
import classes from "./CartButton.module.css";

function CartButton() {
  const dispatch = useAppDispatch();
  const cartQuantity = useAppSelector(
    (state: RootState) => state.cart.totalQuantity
  );

  function toggleCartHandler() {
    dispatch(toggle());
  }

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
}

export default CartButton;
