import axios from "axios";
import { userState } from "./../../types/user.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const loginData = createAsyncThunk(
  "user/login",
  async (values: { email: string; password: string }) => {
    const options = {
      url: `https://linked-posts.routemisr.com/users/signin`,
      method: `post`,
      data: values,
    };
    const data = await axios.request(options);
    return data;
  }
);

export const signup = createAsyncThunk(
  "user/signup",
  async (values: {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    dateOfBirth: string;
    gender: string;
  }) => {
    const options = {
      url: `https://linked-posts.routemisr.com/users/signup`,
      method: `post`,
      data: values,
    };
    const data = await axios.request(options);
    console.log(data);

    return data;
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (values: { password: string; newPassword: string }, store) => {
    const state: any = store.getState();
    const token = state.userS.token;
    const options = {
      url: "https://linked-posts.routemisp.com/users/change-password",
      method: "PATCH",
      data: values,
      headers: {
        token,
      },
    };
    const data = await axios.request(options).then((response)=>{
      console.log(response);
      
    }).catch((error)=>{
      console.log(error);
      
    });
    console.log(data);
    
    return data;
  }
);

const initialState: userState = {
  token: localStorage.getItem("token"),
  message: "",
  isLoading: false,
  isError: false,
  idToast: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers(builder) {
    // Start changePassword
    builder.addCase(changePassword.fulfilled, (prevState, action) => {
      toast.success(action.payload.data.message);
      toast.dismiss(prevState.idToast);
      prevState.message = action.payload.data.message;
    });
    builder.addCase(changePassword.rejected, (prevState, action) => {
      prevState.message = action.error.message;
      prevState.isLoading = false;
      prevState.isError = true;
      toast.error("Icorrect Password or Re-Password");
      toast.dismiss(prevState.idToast);
    });
    builder.addCase(changePassword.pending, (prevState) => {
      prevState.idToast = toast.loading("Waiting...");
    });
    //  End changePassword

    // Start Signup
    builder.addCase(signup.fulfilled, (prevState, action) => {
      console.log(action);
      prevState.isLoading = false;
      prevState.isError = false;
      prevState.message = action.payload.data.message;
      toast.success(action.payload.data.message);
      toast.dismiss(prevState.idToast);
    });
    builder.addCase(signup.rejected, (prevState, action) => {
      console.log(action);

      prevState.message = action.error.message;
      prevState.isLoading = false;
      prevState.isError = true;
      toast.error("Icorrect Email or Password");
      toast.dismiss(prevState.idToast);
    });
    builder.addCase(signup.pending, (prevState) => {
      prevState.isLoading = true;
      prevState.isError = false;
      // console.log("🚴‍♀️");
      prevState.idToast = toast.loading("Waiting...");
    });
    // End Signup

    // Start Login
    builder.addCase(loginData.fulfilled, (prevState, action) => {
      // console.log("✅");
      prevState.token = action.payload.data.token;
      localStorage.setItem("token", action.payload.data.token);
      prevState.isError = false;
      prevState.isLoading = false;
      prevState.message = action.payload.data.message;
      //   console.log(prevState.token);
      //   console.log(prevState.message);
      toast.success(action.payload.data.message);
      toast.dismiss(prevState.idToast);
    });
    builder.addCase(loginData.rejected, (prevState, action) => {
      // console.log("❌");
      prevState.isError = true;
      prevState.isLoading = false;
      prevState.message = action.error.message;
      // console.log(prevState.message);
      toast.error("Icorrect Email or Password");
      toast.dismiss(prevState.idToast);
    });
    builder.addCase(loginData.pending, (prevState) => {
      prevState.isLoading = true;
      prevState.isError = false;
      // console.log("🚴‍♀️");
      prevState.idToast = toast.loading("Waiting...");
    });
    // End Login
  },
});

export const userS = userSlice.reducer;
