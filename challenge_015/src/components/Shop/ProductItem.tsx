import { useAppDispatch } from "../../hooks";

import { addItemToCart } from "../../store/cart-slice";
import Card from "../UI/Card";
import classes from "./ProductItem.module.css";

interface ProductItemProps {
  id: string;
  title: string;
  description: string;
  price: number;
}

function ProductItem(props: ProductItemProps) {
  const dispatch = useAppDispatch();

  const { description, id, price, title } = props;

  function addToCartHandler() {
    dispatch(addItemToCart({ id, name: title, price }));
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
}

export default ProductItem;
