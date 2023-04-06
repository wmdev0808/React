import { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { fetchCartData, sendCartData } from "./store/cart-actions";
import { RootState } from "./store";

let isInitial = true;

function App() {
  const dispatch = useAppDispatch();
  const showCart = useAppSelector((state: RootState) => state.ui.cartIsVisible);
  const cart = useAppSelector((state: RootState) => state.cart);
  const notification = useAppSelector(
    (state: RootState) => state.ui.notification
  );

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
