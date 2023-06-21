import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helper/AxiosInstance";
import { toast } from "react-hot-toast";
import { Iaddress } from "../helper/interfaces";

interface IState {
  address: Iaddress[];
}

const initialState: IState = {
  address: [],
};

// function to get all addresses
export const getAllAddresses = createAsyncThunk("get/address/all", async () => {
  try {
    const res = await axiosInstance.get("/addresses");
    return res.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
});

// function to get address of the user
export const getUserAddresses = createAsyncThunk(
  "get/address/user/all",
  async (userID: string) => {
    try {
      const res = await axiosInstance.get(`/addresses/${userID}`);
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to add new address
export const createAddress = createAsyncThunk(
  "create/address",
  async (addressData: Iaddress) => {
    try {
      const res = await axiosInstance.post(`/addresses`, { ...addressData });
      if (res.data?.success) {
        toast.success(res?.data?.message);
      }
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
