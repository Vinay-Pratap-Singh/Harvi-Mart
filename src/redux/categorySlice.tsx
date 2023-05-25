import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../helper/AxiosInstance";
import { IcategoryDetails } from "../helper/interfaces";

const initialState = {};

// function to create a new category
export const createCategory = createAsyncThunk(
  "/category/create",
  async (data: IcategoryDetails) => {
    try {
      if (data.description === "") {
        const res = await axiosInstance.post("/categories", {
          name: data.name,
        });
        return res.data;
      } else {
        const res = await axiosInstance.post("/categories", {
          name: data.name,
          description: data.description,
        });
        return res.data;
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //   for create new category
    builder.addCase(createCategory.fulfilled, (state, action) => {
      if (action.payload?.success) {
        toast.success(action.payload?.message);
      }
    });
  },
});

export const {} = categorySlice.actions;
export default categorySlice.reducer;
