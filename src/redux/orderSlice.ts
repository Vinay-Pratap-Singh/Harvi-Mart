import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helper/AxiosInstance";
import { toast } from "react-hot-toast";
import { IordersData } from "../helper/interfaces";

interface Istate {
  isLoading: boolean;
  orders: IordersData[];
  isOrdersLoaded: boolean;
}

const initialState: Istate = {
  isLoading: false,
  orders: [],
  isOrdersLoaded: false,
};

// function to fetch all orders
export const getAllOrders = createAsyncThunk("/get/orders", async () => {
  try {
    const res = await axiosInstance.get(`/orders/admin`);
    return res.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
});

// function to fetch logged in user orders
export const getLoggedInUserOrders = createAsyncThunk(
  "/get/loggedin/user/orders",
  async () => {
    try {
      const res = await axiosInstance.get("/orders");
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to cancel the order by admin
export const cancelOrderByAdmin = createAsyncThunk(
  "/cancel/order",
  async (orderID: string) => {
    try {
      const res = await axiosInstance.patch(`/orders/${orderID}/admin`);
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // for admin page, all orders
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        if (action.payload?.success) {
          state.orders = action.payload?.orders;
          state.isOrdersLoaded = true;
        }
        state.isLoading = false;
      })
      .addCase(getAllOrders.rejected, (state) => {
        state.isLoading = false;
      })

      // for loggedin user orders
      .addCase(getLoggedInUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoggedInUserOrders.fulfilled, (state, action) => {
        if (action.payload?.success) {
          state.orders = action.payload?.orders;
        }
        state.isLoading = false;
      })
      .addCase(getLoggedInUserOrders.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default orderSlice.reducer;
