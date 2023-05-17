import axiosInstance from "../helper/AxiosInstance";
import { IauthSliceState, IloginData, IsignupData } from "../helper/interfaces";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: IauthSliceState = {
  accessToken: localStorage.getItem("accessToken") || "",
  isLoggedIn: JSON.parse(
    localStorage.getItem("isLoggedIn") || "false"
  ) as boolean,
  userDetails: JSON.parse(localStorage.getItem("userDetails") || "{}"),
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
      // error.response.data.message
    }
  }
);

// function to login the user
export const login = createAsyncThunk(
  "/auth/login",
  async (data: IloginData) => {
    try {
      const res = await axiosInstance.post("/auth", { ...data });
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
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      localStorage.setItem("userDetails", JSON.stringify(action.payload?.user));
    });

    //   for handling the login functionality
    builder.addCase(login.fulfilled, (state, action) => {
      console.log(action.payload);
      state.isLoggedIn = true;
      state.userDetails = action.payload?.user;
      state.accessToken = action.payload?.accessToken;
      localStorage.setItem("accessToken", action.payload?.accessToken);
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      localStorage.setItem("userDetails", JSON.stringify(action.payload?.user));
    });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
