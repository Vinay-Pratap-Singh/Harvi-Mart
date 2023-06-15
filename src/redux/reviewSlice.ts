import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helper/AxiosInstance";
import { toast } from "react-hot-toast";

const initialState = {
  reviews: [],
};

// function to get all reviews
export const getAllReviews = createAsyncThunk(
  "/get/review/individual",
  async () => {
    try {
      const res = await axiosInstance.get(`/reviews`);
      console.log(res.data);
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to get individual review
export const getIndividualReview = createAsyncThunk(
  "/get/review/individual",
  async (productID: string) => {
    try {
      const res = await axiosInstance.get(`/reviews/${productID}`);
      console.log(res.data);
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: {},
});

export const {} = reviewSlice.actions;
export default reviewSlice.reducer;
