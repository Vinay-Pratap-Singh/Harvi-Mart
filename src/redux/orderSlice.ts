import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helper/AxiosInstance";
import { toast } from "react-hot-toast";
import { IordersData } from "../helper/interfaces";

interface Istate {
  isLoading: boolean;
  orders: IordersData[];
}

const initialState: Istate = {
  isLoading: false,
  orders: [],
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
        }
      })
      .addCase(getAllOrders.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default orderSlice.reducer;
