import { IauthSliceState } from "../helper/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IauthSliceState = {
  accessToken: localStorage.getItem("accessToken") || "",
  isLoggedIn: false,
  userDetails: {
    email: "",
    fullName: "",
    phoneNumber: "",
    role: 0,
    addresses: [],
    avatar: { public_id: "", secure_url: "" },
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {},
});

export const {} = authSlice.actions;
export default authSlice.reducer;
