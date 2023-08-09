import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helper/AxiosInstance";
import { toast } from "react-hot-toast";
import { IproductReview } from "../helper/interfaces";

const initialState = {
  reviews: [],
  isReviewLoaded: false,
};

// function to get all reviews
export const getAllReviews = createAsyncThunk(
  "/get/review/individual",
  async () => {
    try {
      const res = await axiosInstance.get(`/reviews`);
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to get individual review
export const getIndividualReview = createAsyncThunk(
  "/get/review/individual",
  async (reviewID: string) => {
    try {
      const res = await axiosInstance.get(`/reviews/${reviewID}`);
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to get individual product review
export const getIndividualProductReview = createAsyncThunk(
  "/get/review/individual/product",
  async (productID: string) => {
    try {
      const res = await axiosInstance.get(`/reviews/products/${productID}`);
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to create a product review
export const createProductReview = createAsyncThunk(
  "/review/create",
  async (data: IproductReview) => {
    try {
      const res = await axiosInstance.post(`/reviews`, { ...data });
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to delete a product review
export const deleteReview = createAsyncThunk(
  "/review/delete",
  async (reviewID: string) => {
    try {
      const res = await axiosInstance.delete(`/reviews/${reviewID}`);
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
  extraReducers: (builder) => {
    builder
      // for get all reviews
      .addCase(getAllReviews.fulfilled, (state, action) => {
        state.reviews = action.payload?.reviews;
        state.isReviewLoaded = true;
      })
      .addCase(getAllReviews.rejected, () => {
        toast.error("Failed to load the product reviews");
      })

      // for create product review
      .addCase(createProductReview.fulfilled, (state, action) => {
        if (action.payload?.success) {
          toast.success("Review submitted successfully");
        }
      })
      .addCase(createProductReview.rejected, () => {
        toast.error("Failed to submit the review");
      })

      // for get product review by product id
      .addCase(getIndividualProductReview.fulfilled, (state, action) => {
        state.reviews = action.payload?.reviews;
      })
      .addCase(getIndividualProductReview.rejected, () => {
        toast.error("Failed to load the product reviews");
      })

      // for delete a product review
      .addCase(deleteReview.fulfilled, () => {
        toast.success("Review deleted successfully");
      })
      .addCase(deleteReview.rejected, () => {
        toast.error("Failed to delete review");
      });
  },
});

export default reviewSlice.reducer;
