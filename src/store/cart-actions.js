import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchingCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://redux-cart-c064c-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("could not send data");
      }
      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error..",
          message: "fetching  cart data failed",
        })
      );
    }
  };
};

//  using thunk to fetch data
export const sendCartData = (cart) => {
  // by calling sendCartData it return funtion
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "sending..",
        message: "sending the cart data",
      })
    );

    const sendingRequest = async () => {
      const response = await fetch(
        "https://redux-cart-c064c-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({items: cart.items, totalQuantity: cart.totalQuantity}),
        }
      );
      if (!response.ok) {
        throw new Error("sending cart data failed");
      }
    };

    try {
      await sendingRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "success..",
          message: "send  cart data successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error..",
          message: "send  cart data failed",
        })
      );
    }
  };
};
