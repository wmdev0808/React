import { useContext } from "react";

import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";
import CartContext from "../../../store/cart-context";

interface MealItemProps {
  id: string;
  name: string;
  price: number;
  amount?: number;
  description: string;
}

function MealItem(props: MealItemProps) {
  const cartCtx = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  function addToCartHandler(amount: number) {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      price: props.price,
      amount,
    });
  }

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
}

export default MealItem;
