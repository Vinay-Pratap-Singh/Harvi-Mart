import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]"),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      state.cartItems.push(action.payload);
      toast.success("Product added to cart");
      // setting cart data inside localstorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeProductFromCart: (state, action) => {
      const newProductCart = state.cartItems.filter((element: any) => {
        return element?._id !== action.payload;
      });
      state.cartItems = newProductCart;
      toast.success("Product removed successfully");
      // setting cart data inside localstorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { addProductToCart, removeProductFromCart } = cartSlice.actions;
export default cartSlice.reducer;
