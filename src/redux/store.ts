import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import categorySlice from "./categorySlice";
import couponSlice from "./couponSlice";
import productSlice from "./productSlice";
import reviewSlice from "./reviewSlice";
import userSlice from "./userSlice";
import wishlistSlice from "./wishlistSlice";
import cartSlice from "./cartSlice";
import orderSlice from "./orderSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categorySlice,
    coupon: couponSlice,
    product: productSlice,
    review: reviewSlice,
    user: userSlice,
    wishlist: wishlistSlice,
    cart: cartSlice,
    order: orderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
