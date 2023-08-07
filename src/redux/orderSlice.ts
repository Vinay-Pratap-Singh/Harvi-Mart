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

// function to cancel the order by admin
// patch request
// /order/orderid/admin
export const cancelOrderByAdmin = createAsyncThunk(
  "/cancel/order",
  async (orderID: string) => {
    try {
      const res = await axiosInstance.patch(`/orders/${orderID}/admin`);
      console.log(res.data);
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
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        if (action.payload?.success) {
          state.isLoading = false;
          state.orders = action.payload?.orders;
          state.isOrdersLoaded = true;
        }
      })
      .addCase(getAllOrders.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default orderSlice.reducer;
