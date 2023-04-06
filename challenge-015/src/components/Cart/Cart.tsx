import { useAppSelector } from "../../hooks";
import { RootState } from "../../store";

import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

function Cart() {
  const cartItems = useAppSelector((state: RootState) => state.cart.items);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={{
              id: item.id,
              title: item.name,
              quantity: item.quantity,
              total: item.totalPrice,
              price: item.price,
            }}
          />
        ))}
      </ul>
    </Card>
  );
}

export default Cart;
