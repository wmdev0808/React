import { AppThunk } from "./index";
import { showNotification } from "./ui-slice";
import { Item, replaceCart } from "./cart-slice";

export interface ResponseData {
  items: Item[];
  totalQuantity: number;
}

export const fetchCartData = (): AppThunk => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}cart.json`);

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = (await response.json()) as ResponseData;

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity || 0,
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};

export const sendCartData = (cart: ResponseData): AppThunk => {
  return async (dispatch) => {
    dispatch(
      showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}cart.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();

      dispatch(
        showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
