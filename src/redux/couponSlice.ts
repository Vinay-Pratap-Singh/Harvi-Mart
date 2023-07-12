import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IcouponData } from "../helper/interfaces";
import axiosInstance from "../helper/AxiosInstance";
import { toast } from "react-hot-toast";

const initialState = {
  coupons: [],
};

// function to get all coupons data
export const getAllCoupons = createAsyncThunk("coupon/get/all", async () => {
  try {
    const res = await axiosInstance.get("/coupons");
    return res.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
});

// function to create a new coupon
export const createCoupon = createAsyncThunk(
  "/coupon/create",
  async (data: IcouponData, { dispatch }) => {
    try {
      const res = await axiosInstance.post("/coupons", {
        couponCode: data?.couponCode,
        discount: data.discount,
      });
      // getting all the coupons
      await dispatch(getAllCoupons());
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to delete a coupon
export const deleteCoupon = createAsyncThunk(
  "coupon/delete",
  async (id: string, { dispatch }) => {
    try {
      const res = await axiosInstance.delete(`/coupons/${id}`);
      // getting all the coupons
      await dispatch(getAllCoupons());
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to update coupon details
export const updateCoupon = createAsyncThunk(
  "coupon/update",
  async (
    data: { discount: number; isActive: boolean; id: string },
    { dispatch }
  ) => {
    try {
      const res = await axiosInstance.patch(`/coupons/${data.id}`, {
        discount: data.discount,
        isActive: data.isActive,
      });
      // getting all the coupons
      await dispatch(getAllCoupons());
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // for getting all coupons data
    builder
      .addCase(getAllCoupons.fulfilled, (state, action) => {
        if (action.payload) {
          state.coupons = action?.payload?.coupons;
        }
      })
      .addCase(getAllCoupons.rejected, () => {
        toast.error("Failed to load all coupons data");
      })

      //   for create new coupon
      .addCase(createCoupon.fulfilled, (state, action) => {
        if (action.payload?.success) {
          toast.success(action.payload?.message);
        }
      })
      .addCase(createCoupon.rejected, () => {
        toast.error("Failed to create new coupon");
      })

      // for delete coupon
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        if (action.payload?.success) {
          toast.success(action.payload?.message);
        }
      })
      .addCase(deleteCoupon.rejected, () => {
        toast.error("Failed to delete coupon");
      })

      // for update category
      .addCase(updateCoupon.fulfilled, (state, action) => {
        if (action.payload?.success) {
          toast.success(action.payload?.message);
        }
      })
      .addCase(updateCoupon.rejected, () => {
        toast.error("Failed to update coupon");
      });
  },
});

export default couponSlice.reducer;
