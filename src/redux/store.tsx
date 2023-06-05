import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import categorySlice from "./categorySlice";
import couponSlice from "./couponSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categorySlice,
    coupon: couponSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
