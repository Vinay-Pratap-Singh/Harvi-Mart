import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { IcheckoutData, Iproduct, IupdateCartItem } from "../helper/interfaces";
import axiosInstance from "../helper/AxiosInstance";

interface Istate {
  cartItems: Iproduct[];
  updatedCartItems: IupdateCartItem[];
  totalPrice: number;
  totalDiscount: number;
}

const initialState: Istate = {
  cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]"),
  updatedCartItems: JSON.parse(
    localStorage.getItem("cartItemsUpdated") || "[]"
  ),
  totalPrice: 0,
  totalDiscount: 0,
};

// function to perform checkout
export const handleCheckout = createAsyncThunk(
  "/checkout",
  async (data: IcheckoutData) => {
    try {
      const res = await axiosInstance.post("/orders", data);

      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // to create the new updated data
    createUpdatedCart: (state) => {
      const myCart = [...state.cartItems];
      const updatedCart: IupdateCartItem[] = [];
      myCart.forEach((item) => {
        const newItem: IupdateCartItem = { ...item, userSelectedQuantity: 1 };
        updatedCart.push(newItem);
      });
      state.updatedCartItems = [...updatedCart];
      // setting updated cart data inside localstorage
      localStorage.setItem(
        "cartItemsUpdated",
        JSON.stringify(state.updatedCartItems)
      );
    },
    // to add new product to cart
    addProductToCart: (state, action) => {
      state.cartItems.push(action.payload);
      toast.success("Product added to cart");
      // setting cart data inside localstorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    // to remove product from cart
    removeProductFromCart: (state, action) => {
      const newProductCart = state.cartItems.filter((element: Iproduct) => {
        return element?._id !== action.payload;
      });
      state.cartItems = newProductCart;
      toast.success("Product removed successfully");
      // setting cart data inside localstorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    // to calculate the total price and discount
    calculateAmount: (state) => {
      const items = state.updatedCartItems;
      let price = 0;
      let discount = 0;
      items.forEach((item: IupdateCartItem) => {
        price = price + item?.originalPrice * item?.userSelectedQuantity;
        discount += item.discountedPrice
          ? (item?.originalPrice - item?.discountedPrice) *
            item?.userSelectedQuantity
          : 0;
      });
      state.totalPrice = price;
      state.totalDiscount = discount;
    },
    // to increase or decrease the user selected product count
    manageProductCount: (state, action) => {
      const id = action.payload?.id;
      const value = action.payload?.value;
      let products = [...state.updatedCartItems];
      for (let i = 0; i < products.length; i++) {
        if (products[i]._id === id) {
          products[i].userSelectedQuantity += value;
          break;
        }
      }
      state.updatedCartItems = [...products];
    },
  },
});

export const {
  createUpdatedCart,
  addProductToCart,
  removeProductFromCart,
  calculateAmount,
  manageProductCount,
} = cartSlice.actions;
export default cartSlice.reducer;
