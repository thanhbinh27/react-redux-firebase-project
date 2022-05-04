import { toast } from "react-toastify";

const initialState = {
  cartItems: [],
  quantityPre: 1,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const isInCart = state.cartItems.some(
        (item) => item.id === action.payload.id
      );

      if (isInCart) {
        toast.info("This product is already in your cart !");
        // update existing item in cart
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantityPre: item.quantityPre + 1,
                }
              : item
          ),
        };
      }
      // add new item to cart
      toast.success("Added to cart !", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          {
            ...action.payload,
            quantityPre: 1,
          },
        ],
      };

    case "DELETE_FROM_CART": {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    }

    case "CLEAR_CART": {
      return {
        ...state,
        cartItems: [],
      };
    }

    case "PLUS_QUANITY": {
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quanityPre: item.quanityPre + 1,
              }
            : item
        ),
      };
    }

    case "MINUS_QUANTITY": {
      const item = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (item?.quanityPre === 1) {
        // new quantity is 0, remove item from cart
        if (window.confirm("Do you want to delete this product?"))
          return {
            ...state,
            cartItems: state.cartItems.filter(
              (item) => item.id !== action.payload.id
            ),
          };
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
          ],
        };
      }
      // decrement quantity
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quanityPre: item.quanityPre - 1,
              }
            : item
        ),
      };
    }

    default:
      return state;
  }
};

export default cartReducer;
