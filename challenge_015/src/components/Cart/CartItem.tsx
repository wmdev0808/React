import { useAppDispatch } from "../../hooks";

import classes from "./CartItem.module.css";
import { addItemToCart, removeItemFromCart } from "../../store/cart-slice";

interface CartItemProps {
  item: {
    id: string;
    title: string;
    price: number;
    quantity: number;
    total: number;
  };
}

function CartItem(props: CartItemProps) {
  const dispatch = useAppDispatch();

  const { id, title, price, quantity, total } = props.item;

  function removeItemHandler() {
    dispatch(removeItemFromCart(id));
  }

  function addItemHandler() {
    dispatch(addItemToCart({ id, name: title, price }));
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemHandler}>-</button>
          <button onClick={addItemHandler}>+</button>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
