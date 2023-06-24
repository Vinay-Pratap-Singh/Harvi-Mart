import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helper/AxiosInstance";
import { toast } from "react-hot-toast";

const initialState = {
  wishlists: [],
};

// function to get all wishlists
export const getAllWishlists = createAsyncThunk(
  "wishlist/get/all",
  async () => {
    try {
      const res = await axiosInstance.get("/wishlists");
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to create a new wishlist
export const createWishlist = createAsyncThunk(
  "/wishlist/create",
  async (name: string) => {
    try {
      const res = await axiosInstance.post("/wishlists", { name });
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to delete a wishlist
export const deleteWishlist = createAsyncThunk(
  "wishlist/delete",
  async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/wishlists/${id}`);
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // for getting all categories data
      .addCase(getAllWishlists.fulfilled, (state, action) => {
        if (action.payload?.wishlists) {
          state.wishlists = action.payload.wishlists;
        }
      })
      .addCase(getAllWishlists.rejected, () => {
        toast.error("Failed to load all wishlist data");
      })

      //   for create new category
      .addCase(createWishlist.fulfilled, (state, action) => {
        if (action.payload?.success) {
          toast.success(action.payload?.message);
        }
      })
      .addCase(createWishlist.rejected, () => {
        toast.error("Failed to create new wishlist");
      });
  },
});

export const {} = wishlistSlice.actions;
export default wishlistSlice.reducer;
