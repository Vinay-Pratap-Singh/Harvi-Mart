import axiosInstance from "../helper/AxiosInstance";
import { IauthSliceState, IloginData, IsignupData } from "../helper/interfaces";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

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
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
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
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //   for handling the create account function
      .addCase(createAccount.fulfilled, (state, action) => {
        toast.success("Account created successfully");
        action.payload?.accessToken && (state.isLoggedIn = true);
        state.userDetails = action.payload?.user;
        state.accessToken = action.payload?.accessToken;
        action.payload?.accessToken &&
          localStorage.setItem("accessToken", action.payload?.accessToken);
        action.payload?.accessToken &&
          localStorage.setItem("isLoggedIn", JSON.stringify(true));
        action.payload?.user &&
          localStorage.setItem(
            "userDetails",
            JSON.stringify(action.payload?.user)
          );
      })
      .addCase(createAccount.rejected, (state) => {
        toast.error("Failed to create account");
        state.isLoggedIn = false;
        localStorage.clear();
      })
      //   for handling the login functionality
      .addCase(login.fulfilled, (state, action) => {
        toast.success("Login successfull");
        action.payload?.accessToken && (state.isLoggedIn = true);
        state.userDetails = action.payload?.user;
        state.accessToken = action.payload?.accessToken;
        action.payload?.accessToken &&
          localStorage.setItem("accessToken", action.payload?.accessToken);
        action.payload?.accessToken &&
          localStorage.setItem("isLoggedIn", JSON.stringify(true));
        action.payload?.user &&
          localStorage.setItem(
            "userDetails",
            JSON.stringify(action.payload?.user)
          );
      })
      .addCase(login.rejected, (state) => {
        toast.error("Failed to login");
        state.isLoggedIn = false;
        localStorage.clear();
      });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
