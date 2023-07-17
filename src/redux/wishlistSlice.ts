import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helper/AxiosInstance";
import { toast } from "react-hot-toast";
import { Iwishlist } from "../helper/interfaces";

interface Istate {
  wishlists: Iwishlist[];
}

const initialState: Istate = {
  wishlists: JSON.parse(localStorage.getItem("wishlist") || "[]"),
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
  async (name: string, { dispatch }) => {
    try {
      const res = await axiosInstance.post("/wishlists", { name });
      await dispatch(getAllWishlists());
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to delete a wishlist
export const deleteWishlist = createAsyncThunk(
  "wishlist/delete",
  async (id: string, { dispatch }) => {
    try {
      const res = await axiosInstance.delete(`/wishlists/${id}`);
      await dispatch(getAllWishlists());
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to create a new wishlist
export const addProductToWishlist = createAsyncThunk(
  "/wishlist/add/product",
  async (id: { wishlistID: string; productID: string }, { dispatch }) => {
    try {
      const res = await axiosInstance.patch(
        `/wishlists/${id.wishlistID}/products/${id.productID}`
      );
      await dispatch(getAllWishlists());
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to remove product from wishlist
export const removeFromWishlist = createAsyncThunk(
  "wishlist/remove/product",
  async (id: { wishlistID: string; productID: string }, { dispatch }) => {
    try {
      const res = await axiosInstance.delete(
        `/wishlists/${id.wishlistID}/products/${id.productID}`
      );
      await dispatch(getAllWishlists());
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
          state.wishlists = action.payload.wishlists as Iwishlist[];
          localStorage.setItem(
            "wishlist",
            JSON.stringify(action?.payload?.wishlists)
          );
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
      })

      //   for add product to be wishlist
      .addCase(addProductToWishlist.fulfilled, (state, action) => {
        if (action.payload?.success) {
          toast.success(action.payload?.message);
        }
      })
      .addCase(addProductToWishlist.rejected, () => {
        toast.error("Failed to add in wishlist");
      })

      // for delete category
      .addCase(deleteWishlist.fulfilled, (state, action) => {
        if (action.payload?.success) {
          toast.success(action.payload?.message);
        }
      })
      .addCase(deleteWishlist.rejected, () => {
        toast.error("Failed to delete wishlist");
      })

      //   for remove product from wishlist
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        if (action.payload?.success) {
          toast.success(action.payload?.message);
        }
      })
      .addCase(removeFromWishlist.rejected, () => {
        toast.error("Failed to remove product from wishlist");
      });
  },
});

export default wishlistSlice.reducer;
