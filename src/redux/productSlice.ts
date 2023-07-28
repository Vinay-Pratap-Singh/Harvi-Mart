import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helper/AxiosInstance";
import { toast } from "react-hot-toast";
import { Iproduct, IproductData } from "../helper/interfaces";

interface Istate {
  products: Iproduct[];
  searchedText: string;
  isLoading: boolean;
}
const initialState: Istate = {
  products: [],
  searchedText: "",
  isLoading: false,
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
  async (data: IproductData) => {
    // try {
    //   // creating the form data
    //   const newFormData = new FormData();
    //   newFormData.append("title", data?.title);
    //   newFormData.append("description", data?.description);
    //   newFormData.append("originalPrice", data?.originalPrice.toString());
    //   newFormData.append("discountedPrice", data?.discountedPrice.toString());
    //   newFormData.append("category", data?.category);
    //   newFormData.append("quantity", data?.quantity.toString());
    //   newFormData.append("inStock", data?.inStock);
    //   data.productImage &&
    //     newFormData.append("productImage", data?.productImage);
    //   const res = await axiosInstance.post("/products", newFormData);
    //   return res.data;
    // } catch (error: any) {
    //   toast.error(error?.response?.data?.message);
    // }
  }
);

// function to update product
export const updateProduct = createAsyncThunk(
  "/products/update",
  async (data: IproductData) => {
    // try {
    //   // creating the form data
    //   const newFormData = new FormData();
    //   newFormData.append("title", data?.title);
    //   newFormData.append("description", data?.description);
    //   newFormData.append("originalPrice", data?.originalPrice.toString());
    //   newFormData.append("discountedPrice", data?.discountedPrice.toString());
    //   newFormData.append("category", data?.category);
    //   newFormData.append("quantity", data?.quantity.toString());
    //   newFormData.append("inStock", data?.inStock);
    //   data.productImage &&
    //     newFormData.append("productImage", data?.productImage);
    //   const res = await axiosInstance.put(`/products/${data?.id}`, newFormData);
    //   return res.data;
    // } catch (error: any) {
    //   toast.error(error?.response?.data?.message);
    // }
  }
);

// function to delete the product
export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/products/${id}`);
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSearchedText: (state, action: PayloadAction<string>) => {
      state.searchedText = action.payload;
    },
  },
  extraReducers: (builder) => {
    // for get all product details
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        if (action.payload) {
          state.products = action.payload.products as Iproduct[];
          state.isLoading = false;
        }
      })
      .addCase(getAllProducts.rejected, (state) => {
        toast.error("Failed to load all products data");
        state.isLoading = false;
      })

      //  for create new product
      .addCase(addNewProduct.fulfilled, (state, action) => {
        // if (action.payload?.success) {
        //   toast.success(action.payload?.message);
        // }
      })
      .addCase(addNewProduct.rejected, () => {
        toast.error("Failed to add new product");
      })

      // for delete product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        if (action.payload?.success) {
          toast.success(action.payload?.message);
        }
      })
      .addCase(deleteProduct.rejected, () => {
        toast.error("Failed to delete product");
      })

      // for update product
      .addCase(updateProduct.fulfilled, (state, action) => {
        // if (action.payload?.success) {
        //   toast.success(action.payload?.message);
        // }
      })
      .addCase(updateProduct.rejected, () => {
        toast.error("Failed to update product");
      });
  },
});

export const { setSearchedText } = productSlice.actions;
export default productSlice.reducer;
