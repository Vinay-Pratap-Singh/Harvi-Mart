import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helper/AxiosInstance";
import { toast } from "react-hot-toast";

const initialState: any = [];

// function to get all addresses
export const getAllAddresses = createAsyncThunk("address/get/all", async () => {
  try {
    const res = await axiosInstance.get("/addresses");
    return res.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
});

// function to get address of the user
export const getUserAddresses = createAsyncThunk(
  "address/get/user/all",
  async (userID: string) => {
    try {
      const res = await axiosInstance.get(`/addresses/${userID}`);
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // for getting all addresses
      .addCase(getAllAddresses.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(getAllAddresses.rejected, () => {
        toast.error("Failed to get all addresses");
      })

      // for getting user addresses
      .addCase(getUserAddresses.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(getUserAddresses.rejected, () => {
        toast.error("Failed to get user addresses");
      });
  },
});

export const {} = addressSlice.actions;
export default addressSlice.reducer;
