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
    },
  },
});

export const { addProductToCart } = cartSlice.actions;
export default cartSlice.reducer;
