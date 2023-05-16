import axiosInstance from "../helper/AxiosInstance";
import { IauthSliceState, IsignupData } from "../helper/interfaces";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: IauthSliceState = {
  accessToken: localStorage.getItem("accessToken") || "",
  isLoggedIn: false,
  userDetails: {},
};

// function for creating the new account
export const createAccount = createAsyncThunk(
  "/auth/signup",
  async (data: IsignupData) => {
    try {
      const res = await axiosInstance.post("/auth/new", { ...data });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //   for handling the create account function
    builder.addCase(createAccount.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.userDetails = action.payload?.user;
      state.accessToken = action.payload?.accessToken;
      localStorage.setItem("accessToken", action.payload?.accessToken);
    });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
