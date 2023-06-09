import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helper/AxiosInstance";
import { toast } from "react-hot-toast";

const initialState = {
  products: [],
};

// function to get all products
export const getAllProducts = createAsyncThunk(
  "/products/get/all",
  async () => {
    try {
      const res = await axiosInstance.get("/products");
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to add new product
export const addNewProduct = createAsyncThunk(
  "/products/add",
  async (data: {
    productImage: File;
    title: string;
    description: string;
    originalPrice: number;
    discountedPrice: number;
    category: string;
    quantity: number;
    inStock: string;
  }) => {
    try {
      // creating the form data
      const newFormData = new FormData();
      newFormData.append("title", data?.title);
      newFormData.append("description", data?.description);
      newFormData.append("originalPrice", data?.originalPrice.toString());
      newFormData.append("discountedPrice", data?.discountedPrice.toString());
      newFormData.append("category", data?.category);
      newFormData.append("quantity", data?.quantity.toString());
      newFormData.append("inStock", data?.inStock);
      newFormData.append("productImage", data?.productImage);
      const res = await axiosInstance.post("/products", newFormData);
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // for get all product details
    builder
      .addCase(getAllProducts.fulfilled, (state, action) => {
        if (action.payload) {
          state.products = action.payload.products;
        }
      })
      .addCase(getAllProducts.rejected, () => {
        toast.error("Failed to load all products data");
      })

      //  for create new product
      .addCase(addNewProduct.fulfilled, (state, action) => {
        if (action.payload?.success) {
          toast.success(action.payload?.message);
        }
      })
      .addCase(addNewProduct.rejected, () => {
        toast.error("Failed to add new product");
      });
  },
});

export const {} = productSlice.actions;
export default productSlice.reducer;
