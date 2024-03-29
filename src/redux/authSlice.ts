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
  loading: false,
};

// function for creating a new account
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

// function to handle login
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

// function to handle logout
export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
});

// function to handle forget password
export const forgetPassword = createAsyncThunk(
  "auth/forget",
  async (email: string) => {
    try {
      const res = await axiosInstance.post("/auth/reset", { email });
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to handle reset password
export const resetPassword = createAsyncThunk(
  "/auth/reset",
  async (data: { token: string; password: string }) => {
    try {
      const res = await axiosInstance.post(`/auth/reset/${data.token}`, {
        password: data.password,
      });
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to get logged in user details
export const getLoggedInUserData = createAsyncThunk(
  "get/user/details",
  async () => {
    try {
      const res = await axiosInstance.get("/users/me");
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //   for handling the create account function
      .addCase(createAccount.fulfilled, (state, action) => {
        if (action.payload) {
          toast.success("Account created successfully");
          state.isLoggedIn = true;
          state.accessToken = action.payload?.accessToken;
          state.userDetails = action.payload?.user;
          localStorage.setItem("isLoggedIn", JSON.stringify(true));
          localStorage.setItem("accessToken", action.payload?.accessToken);
          localStorage.setItem(
            "userDetails",
            JSON.stringify(action.payload?.user)
          );
        }
      })
      .addCase(createAccount.rejected, (state) => {
        toast.error("Failed to create account");
        state.isLoggedIn = false;
        localStorage.clear();
      })

      //   for handling the login functionality
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload) {
          toast.success("Login successfull");
          state.isLoggedIn = true;
          state.accessToken = action.payload?.accessToken;
          state.userDetails = action.payload?.user;
          localStorage.setItem("isLoggedIn", JSON.stringify(true));
          localStorage.setItem("accessToken", action.payload?.accessToken);
          localStorage.setItem(
            "userDetails",
            JSON.stringify(action.payload?.user)
          );
        }
      })
      .addCase(login.rejected, (state) => {
        toast.error("Failed to login");
        state.isLoggedIn = false;
        localStorage.clear();
      })

      // for handling the logout functionality
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        toast.success("Logout successfull");
        localStorage.clear();
        state.accessToken = "";
        state.isLoggedIn = false;
        state.userDetails = {
          _id: "",
          addresses: [],
          avatar: { public_id: "", secure_url: "" },
          email: "",
          fullName: "",
          isActive: false,
          loginCount: 0,
          phoneNumber: "",
          role: 0,
        };
        state.loading = false;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
      })

      // for handling the forget password
      .addCase(forgetPassword.fulfilled, () => {
        toast.success("Please check your email for reset link");
      })
      .addCase(forgetPassword.rejected, () => {
        toast.error("Failed to send the reset link");
      })

      // for handling the reset password
      .addCase(resetPassword.fulfilled, (state, action) => {
        if (action.payload) {
          toast.success("Password changed successfully");
        }
      })
      .addCase(resetPassword.rejected, () => {
        toast.error("Failed to change password");
      })

      // for getting logged in user data
      .addCase(getLoggedInUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLoggedInUserData.fulfilled, (state, action) => {
        if (action.payload) {
          state.isLoggedIn = true;
          state.userDetails = action.payload?.user;
          localStorage.setItem("isLoggedIn", JSON.stringify(true));
          localStorage.setItem(
            "userDetails",
            JSON.stringify(action.payload?.user)
          );
        }
        state.loading = false;
      })
      .addCase(getLoggedInUserData.rejected, (state) => {
        toast.error("Failed to load user data");
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
