import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helper/AxiosInstance";
import { toast } from "react-hot-toast";
import { IupdateProfile } from "../helper/interfaces";
import { getLoggedInUserData } from "./authSlice";

const initialState = {};

// function to update user details
export const updateUserDetails = createAsyncThunk(
  "category/update",
  async (data: IupdateProfile, { dispatch }) => {
    try {
      const newData = new FormData();
      data.userImage && newData.append("userImage", data.userImage);
      newData.append("fullName", data.fullName);
      const res = await axiosInstance.put(`/users`, newData);
      await dispatch(getLoggedInUserData());
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to delete user account
export const deleteUserAccount = createAsyncThunk(
  "category/delete",
  async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/users/${id}`);
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // for update category
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        if (action.payload?.success) {
          toast.success(action.payload?.message);
        }
      })
      .addCase(updateUserDetails.rejected, () => {
        toast.error("Failed to update user details");
      })

      // for delete category
      .addCase(deleteUserAccount.fulfilled, (state, action) => {
        if (action.payload?.success) {
          toast.success(action.payload?.message);
        }
      })
      .addCase(deleteUserAccount.rejected, () => {
        toast.error("Failed to delete your aaccount");
      });
  },
});

export default userSlice.reducer;
