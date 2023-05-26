import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../helper/AxiosInstance";
import { IcategoryDetails } from "../helper/interfaces";

const initialState = {
  categories: [],
};

// function to get all category data
export const getAllCategories = createAsyncThunk(
  "category/get/all",
  async () => {
    try {
      const res = await axiosInstance.get("/categories");
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

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

// function to delete a category
export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id: string) => {
    console.log(id);
    try {
      const res = await axiosInstance.delete(`/categories/${id}`);
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to update category details
export const updateCategory = createAsyncThunk(
  "category/update",
  async (data: { id: string; name: string; description?: string }) => {
    try {
      const res = await axiosInstance.put(`/categories/${data.id}`, {
        name: data.name,
        description: data?.description,
      });
      return res.data;
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
    // for getting all categories data
    builder
      .addCase(getAllCategories.fulfilled, (state, action) => {
        if (action.payload?.categories) {
          state.categories = action.payload.categories;
        }
      })
      .addCase(getAllCategories.rejected, () => {
        toast.error("Failed to load all categories data");
      })

      //   for create new category
      .addCase(createCategory.fulfilled, (state, action) => {
        if (action.payload?.success) {
          toast.success(action.payload?.message);
        }
      })
      .addCase(createCategory.rejected, () => {
        toast.error("Failed to create new category");
      })

      // for delete category
      .addCase(deleteCategory.fulfilled, (state, action) => {
        if (action.payload?.success) {
          toast.success(action.payload?.message);
        }
      })
      .addCase(deleteCategory.rejected, () => {
        toast.error("Failed to delete category");
      })

      // for update category
      .addCase(updateCategory.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload?.success) {
          toast.success(action.payload?.message);
        }
      });
  },
});

export const {} = categorySlice.actions;
export default categorySlice.reducer;
