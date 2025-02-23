import { postState } from "@/types/posts.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const getPosts = createAsyncThunk("posts/getPosts", async (_, store) => {
  const state: any = store.getState();
  const token = state.userS.token;
  const options = {
    url: "https://linked-posts.routemisr.com/posts?limit=50",
    method: "GET",
    headers: {
      token,
    },
  };

  const { data } = await axios.request(options);
  return data.posts;
});

export const getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async (_, store) => {
    const state: any = store.getState();
    const token = state.userS.token;
    const options = {
      url: "https://linked-posts.routemisr.com/posts?limit=50&page=60",
      method: "GET",
      headers: {
        token,
      },
    };

    const { data } = await axios.request(options);
    return data.posts;
  }
);

export const getPostDetails = createAsyncThunk(
  "posts/getPostDetails",
  async (id: string, store) => {
    const state: any = store.getState();
    const token = state.userS.token;
    const options = {
      url: `https://linked-posts.routemisr.com/posts/${id}`,
      method: "GET",
      headers: {
        token,
      },
    };

    const { data } = await axios.request(options);
    // console.log(data);

    return data.post;
  }
);

const initialState: postState = {
  posts: null,
  postDetails: null,
  postUser: null,
};
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  
  extraReducers: (builder) => {
    builder.addCase(getUserPosts.fulfilled, (prevState, action) => {
      // console.log(action.payload);
      prevState.postUser = action.payload;
    });
    builder.addCase(getUserPosts.rejected, (prevState, action) => {
      // console.log("❌");
      // console.log(action);
    });
    builder.addCase(getPosts.fulfilled, (prevState, action) => {
      // console.log(action.payload);
      prevState.posts = action.payload;
    });
    builder.addCase(getPosts.rejected, (prevState, action) => {
      // console.log("❌");
      // console.log(action);
    });
    builder.addCase(getPostDetails.fulfilled, (prevState, action) => {
      // console.log("✅");
      // console.log(action);
      prevState.postDetails = action.payload;
    });
    builder.addCase(getPostDetails.rejected, (prevState, action) => {
      // console.log("❌");
      // console.log(action);
    });
  },
});

export const SliceP = postSlice.reducer;
